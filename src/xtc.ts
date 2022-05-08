import { Principal } from "@dfinity/principal";
import { createWalletActor, createXtcActor } from "./createActor";
import { IDL } from "@dfinity/candid";
import { principal } from "./identity/identity";
import { SONIC_ENV } from "./canisters/sonic/env";

export function convertCyclesE12ToXTC(cycles: bigint) {
  return Number(cycles) / 1e12;
}

export async function burnXTCToOwnCycles(amount: bigint) {
  const xtcActor = createXtcActor();

  let burnXtc = await xtcActor.burn({
    canister_id: Principal.fromText(process.env.CYCLES_WALLET),
    amount: amount,
  });
  return burnXtc;
}

export async function getXTCBalance() {
  const xtcActor = createXtcActor();
  const xtcBalance = await xtcActor.balance([]);
  return xtcBalance;
}

export async function mintXtcByOwnCycles(
  cyclesE12: bigint,
  toPrincipal: Principal = principal,
) {
  const xtcActor = createXtcActor();
  const xtcBalancBeforeMint = await xtcActor.balance([]);

  const walletActor = createWalletActor();

  let args = IDL.encode([IDL.Principal, IDL.Nat], [toPrincipal, BigInt(0)]);

  // mint xtc
  let swapCyclesToICPRes = await walletActor.wallet_call({
    canister: Principal.fromText(SONIC_ENV.canistersPrincipalIDs.XTC),
    method_name: "mint",
    args: [...Buffer.from(args)],
    cycles: cyclesE12,
  });

  const newXTCBalance = await xtcActor.balance([]);
  if ("Ok" in swapCyclesToICPRes) {
  } else {
    throw Error(`swapCyclesToICP failed`);
  }

  return newXTCBalance - xtcBalancBeforeMint;
}
