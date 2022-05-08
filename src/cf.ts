// cycles finance
import "isomorphic-fetch";
import { IDL } from "@dfinity/candid";
import {
  createCyclesFinanceActor,
  createWalletActor,
  createWICPActor,
} from "../src/createActor";
import { principal } from "../src/identity/identity";
import { Principal } from "@dfinity/principal";
import { burnWICPToOwnICP } from "../src/wicp";
import {
  checkMyLedgerBalances,
  ledgerCheckICPBalanceByAccountId,
  ledgerTransferICPToAccountId,
} from "../src/ledger";
import { ICP_TRANSFER_FEE } from "./const";

// cycles finance
export async function cfCyclesToICP({
  amountCycles,
  // the text form of principal who should receive the ICPS, should be capable of receiving ICPS
  to_principal = "to principal",
}: {
  amountCycles: bigint;
  to_principal: string;
}) {
  const walletActor = createWalletActor();

  let args = IDL.encode(
    [IDL.Text, IDL.Opt(IDL.Nat), IDL.Opt(IDL.Vec(IDL.Nat8))],
    [to_principal, [], []],
  );
  const cyclesFinanceCanisterID = "6nmrm-laaaa-aaaak-aacfq-cai";
  let swapCyclesToICP = await walletActor.wallet_call({
    canister: Principal.fromText(cyclesFinanceCanisterID),
    method_name: "cyclesToIcp",
    args: [...Buffer.from(args)],
    cycles: amountCycles,
  });

  if (!("Ok" in swapCyclesToICP)) {
    throw Error(`swapCyclesToICP failed`);
  }
  const icpBalance = await checkMyLedgerBalances(principal);
}

export async function cfICPToCycles({
  icpE8,
  toCyclesWallet = process.env.CYCLES_WALLET,
}: {
  icpE8: bigint;
  toCyclesWallet: string;
}) {
  const cfActor = createCyclesFinanceActor();

  const myCFAccountId = await cfActor.getAccountId(principal.toText());

  const cfICPBalance = await ledgerCheckICPBalanceByAccountId(myCFAccountId);

  if (cfICPBalance.e8s < icpE8) {
    // check wicp first before transfer
    const wicpActor = createWICPActor();
    const wicpBalance = await wicpActor.balanceOf(principal);
    if (wicpBalance + ICP_TRANSFER_FEE >= icpE8) {
      await burnWICPToOwnICP(icpE8 + ICP_TRANSFER_FEE, myCFAccountId);
      // verify balance
      const cfICPBalance = await ledgerCheckICPBalanceByAccountId(
        myCFAccountId,
      );

      if (cfICPBalance.e8s < icpE8) {
        throw Error(`cfICPBalance < icpE8`);
      }
    } else {
      await ledgerTransferICPToAccountId(myCFAccountId, icpE8);
    }
  }

  const res = await cfActor.icpToCycles(
    icpE8,
    Principal.fromText(toCyclesWallet),
    [],
    [],
    [],
  );

  if ("ok" in res) {
    let cycles = res.ok.cycles;
    if ("CreditRecord" in cycles) {
      return cycles.CreditRecord;
    }
  } else {
    throw Error("Error converting icp to cycles");
  }
}
