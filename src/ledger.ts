import { Principal } from "@dfinity/principal";
import { principalToAccountIdentifier } from "../utils";
import { createLedgerActor } from "./createActor";

const ledgerActor = createLedgerActor();

export const checkMyLedgerBalances = async (principal: Principal) => {
  const accountIdentifier = principalToAccountIdentifier(
    principal.toText(),
    undefined,
  );

  const b = await ledgerActor.account_balance({
    account: [...accountIdentifier],
  });
  return b;
};

export const ledgerCheckICPBalanceByAccountId = async (accountId: string) => {
  const ledgerActor = createLedgerActor();

  let acc = Uint8Array.from(Buffer.from(accountId, "hex"));
  const b = await ledgerActor.account_balance({
    account: [...acc],
  });
  return b;
};

export const ledgerTransferICPToAccountId = async (
  toAddress: string,
  amountIcpE8s: bigint,
) => {
  const ledgerActor = createLedgerActor();
  let _to = Uint8Array.from(Buffer.from(toAddress, "hex"));
  const transfer = await ledgerActor.transfer({
    to: [..._to],
    fee: { e8s: BigInt(10000) },
    memo: BigInt(0),
    from_subaccount: [],
    created_at_time: [],
    amount: { e8s: amountIcpE8s },
  });

  if ("Err" in transfer) {
    throw new Error(`Transfer failed: ${transfer.Err}`);
  }
  return transfer;
};
