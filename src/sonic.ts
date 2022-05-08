import { Actor, HttpAgent } from "@dfinity/agent";
import {
  ActorAdapter,
  createSwapActor,
  SwapCanisterController,
} from "@psychedelic/sonic-js";
import { host } from "./const";
import { myAgent } from "./createActor";
import { identity, principal } from "./identity/identity";

import { InterfaceFactory } from "@dfinity/candid/lib/cjs/idl";
import { SONIC_ENV } from "./canisters/sonic/env";

export enum Currency {
  WICP = "WICP",
  XTC = "XTC",
  CYCLES = "CYCLES",
}
export const sonicProvider: ActorAdapter.Provider = {
  agent: myAgent,
  createActor: <T>({
    agent,
    canisterId,
    interfaceFactory,
  }: {
    interfaceFactory: InterfaceFactory;
    agent: HttpAgent;
    canisterId: string;
  }) => {
    const actor = Actor.createActor<T>(interfaceFactory, {
      agent: myAgent,
      canisterId,
    });
    return actor;
  },
  createAgent: async (params: ActorAdapter.CreateAgentParams) => {
    const agent = new HttpAgent({
      ...params,
      identity,
      host: params.host || host,
    });
    return agent;
  },
};

export function getTokenIdByCurrency(currency: Currency) {
  const { WICP, XTC } = SONIC_ENV.canistersPrincipalIDs;
  switch (currency) {
    case "WICP":
      return WICP;
    case "XTC":
      return XTC;
    default:
      throw new Error(`Unknown currency: ${currency}`);
  }
}

export async function sonicSwapTokens({
  currencyIn,
  currencyOut,
  currencyInAmount,
  slippage,
}: {
  currencyIn: Currency;
  currencyOut: Currency;
  currencyInAmount: string;
  slippage: number;
}) {
  const tokenIn = getTokenIdByCurrency(currencyIn);
  const tokenOut = getTokenIdByCurrency(currencyOut);

  const swapController = await createSonicSwapController();
  let balances = await swapController.getTokenBalances(principal.toString());

  let tokenInBalanceBeforeSwap = balances[tokenIn].total;
  let tokenOutBalanceBeforeSwap = balances[tokenOut].total;

  if (tokenInBalanceBeforeSwap.isLessThan(currencyInAmount)) {
    throw Error(
      `You don't have sufficient funds of ${tokenIn} please make sure to transfer some first`,
    );
  }

  // if sonic.balance of token is bigger than currency in amount don't deposit else deposit
  if (tokenInBalanceBeforeSwap.isGreaterThanOrEqualTo(currencyInAmount)) {
  } else {
    await swapController.approve({
      tokenId: tokenIn,
      amount: currencyInAmount,
    });

    await swapController.deposit({
      tokenId: tokenIn,
      amount: currencyInAmount,
    });
  }

  await swapController.swap({
    tokenIn,
    amountIn: currencyInAmount,
    tokenOut,
    slippage,
  });

  balances = await swapController.getTokenBalances(principal.toString());

  let tokenInBalanceAfterSwap = balances[tokenIn].total;
  let tokenOutBalanceAfterSwap = balances[tokenOut].total;

  let tokenInDiff = tokenInBalanceAfterSwap.minus(tokenInBalanceBeforeSwap);

  let tokenOutDiff = tokenOutBalanceAfterSwap.minus(tokenOutBalanceBeforeSwap);

  let amountTokenOutToWithdraw = tokenOutDiff;

  if (tokenOutDiff.isLessThanOrEqualTo(0)) {
    throw Error(`tokenOutDiff is less than 0 is ${tokenOutDiff.toNumber()}`);
  }

  if (amountTokenOutToWithdraw.isLessThan(0)) {
    throw Error(
      `amountTokenOutToWithdraw is less than zero ${amountTokenOutToWithdraw}`,
    );
  }

  await swapController.withdraw({
    amount: amountTokenOutToWithdraw.toString(),
    tokenId: tokenOut,
  });

  return amountTokenOutToWithdraw.toNumber();
}

export async function createSonicSwapController() {
  const adapter = new ActorAdapter(sonicProvider);

  const mySwapActor = await createSwapActor({ actorAdapter: adapter });

  const swapController = new SwapCanisterController(mySwapActor);
  return swapController;
}

export async function getSonicBalances(tokenIn: Currency, tokenOut: Currency) {
  const sonic = await createSonicSwapController();
  const balances = await sonic.getTokenBalances(principal.toString());
  const sonicWicp = balances[getTokenIdByCurrency(tokenIn)].total;
  const sonicXtc = balances[getTokenIdByCurrency(tokenOut)].total;
  return { sonicWicp, sonicXtc };
}

export async function sonicWithdrawToken(token: Currency, amount: string) {
  const tokenOut = getTokenIdByCurrency(token);
  const swapController = await createSonicSwapController();
  await swapController.withdraw({
    amount,
    tokenId: tokenOut,
  });
}
