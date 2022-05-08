import { Actor, HttpAgent } from "@dfinity/agent";
import { identity } from "../src/identity/identity";
import {
  canisterId as cyclesFinanceCanisterId,
  idlFactory as cyclesFinanceIdlFactory,
} from "./canisters/cycles.finance";
import {
  canisterId as cyclesMintingCanisterId,
  idlFactory as cyclesMintingIdlFactory,
} from "./canisters/cycles_minting";
import {
  canisterId as ledgerCanisterId,
  idlFactory as ledgerIdlFactory,
} from "./canisters/ledger";
import {
  canisterId as xtcCanisterId,
  idlFactory as xtcIdlFactory,
} from "./canisters/xtc";
import { idlFactory as wicpIdlFactory } from "./canisters/wicp";
import { idlFactory as walletIdlFactory } from "./canisters/wallet";
import _CYCLES_FINANCE_SERVICE from "./canisters/cycles.finance/cycles.did";
import _WALLET_SERVICE from "./canisters/wallet/wallet.did";
import _WICP_SERVIC from "./canisters/wicp/wicp.did";
import _CYCLES_MINTING_SERVICE from "./canisters/cycles_minting/cycles.did";
import _LEDGER_SERVICE from "./canisters/ledger/Ledger_Candid.did";
import _XTC_SERVICE from "./canisters/xtc/xtc.did";
import { SwapIDL } from "./canisters/sonic/did/swap.did";
import { SONIC_ENV } from "./canisters/sonic/env";
import { InterfaceFactory } from "@dfinity/candid/lib/cjs/idl";

export const myAgent = new HttpAgent({
  identity,
  host: process.env.HOST,
});
export function createCyclesFinanceActor() {
  const actor = Actor.createActor<_CYCLES_FINANCE_SERVICE>(
    cyclesFinanceIdlFactory,
    {
      agent: myAgent,
      canisterId: cyclesFinanceCanisterId,
    },
  );
  return actor;
}
export function createCyclesMintingActor() {
  const actor = Actor.createActor<_CYCLES_MINTING_SERVICE>(
    cyclesMintingIdlFactory,
    {
      agent: myAgent,
      canisterId: cyclesMintingCanisterId,
    },
  );
  return actor;
}

export function createLedgerActor() {
  const actor = Actor.createActor<_LEDGER_SERVICE>(ledgerIdlFactory, {
    agent: myAgent,
    canisterId: ledgerCanisterId,
  });
  return actor;
}
export function createXtcActor() {
  const actor = Actor.createActor<_XTC_SERVICE>(xtcIdlFactory, {
    agent: myAgent,
    canisterId: xtcCanisterId,
  });
  return actor;
}
export function createSwapActor() {
  const actor = Actor.createActor<SwapIDL.Swap>(SwapIDL.factory, {
    agent: myAgent,
    canisterId: SONIC_ENV.canistersPrincipalIDs.swap,
  });
  return actor;
}
export function createWalletActor() {
  const actor = Actor.createActor<_WALLET_SERVICE>(walletIdlFactory, {
    agent: myAgent,
    canisterId: process.env.CYCLES_WALLET,
  });
  return actor;
}
export function createWICPActor() {
  const actor = Actor.createActor<_WICP_SERVIC>(wicpIdlFactory, {
    agent: myAgent,
    canisterId: SONIC_ENV.canistersPrincipalIDs.WICP,
  });
  return actor;
}

export async function createActor<T>({
  agent,
  canisterId,
  interfaceFactory,
}: {
  interfaceFactory: InterfaceFactory;
  agent: HttpAgent;
  canisterId: string;
}) {
  const actor = Actor.createActor<T>(interfaceFactory, {
    agent,
    canisterId,
  });
  return actor;
}
