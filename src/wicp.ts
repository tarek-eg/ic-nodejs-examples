import { SONIC_ENV } from "./canisters/sonic/env";
import { createWICPActor } from "./createActor";
import { principal } from "./identity/identity";
import { ledgerTransferICPToAccountId } from "./ledger";

const actor = createWICPActor();

export async function burnWICPToOwnICP(wicpE8: bigint, toAccountId: string) {
  const res = await actor.withdraw(wicpE8, toAccountId);
}

export async function mintWicpWithOwnICP(amountE8: bigint) {
  const WICP_ACCOUNT_ID = SONIC_ENV.accountIDs.WICP;

  const blockHeight = await ledgerTransferICPToAccountId(
    WICP_ACCOUNT_ID,
    amountE8,
  );

  const mint = await actor.mint([], blockHeight.Ok);

  const wicpBalance = await actor.balanceOf(principal);
}

export async function getWicpBalance() {
  const actor = createWICPActor();
  const wicpBalance = await actor.balanceOf(principal);
  return wicpBalance;
}
