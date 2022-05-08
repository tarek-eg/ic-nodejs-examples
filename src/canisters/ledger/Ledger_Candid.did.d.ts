import type { Principal } from "@dfinity/principal";
export interface AccountBalanceArgs {
  account: Address;
}
export type Address = Array<number>;
export type BlockIndex = bigint;
export interface ICP {
  e8s: bigint;
}
export type Memo = bigint;
export type SubAccount = Array<number>;
export interface TimeStamp {
  timestamp_nanos: bigint;
}
export interface TransferArgs {
  to: Address;
  fee: ICP;
  memo: Memo;
  from_subaccount: [] | [SubAccount];
  created_at_time: [] | [TimeStamp];
  amount: ICP;
}
export type TransferError =
  | {
      TxTooOld: { allowed_window_nanos: bigint };
    }
  | { BadFee: { expected_fee: ICP } }
  | { TxDuplicate: { duplicate_of: BlockIndex } }
  | { TxCreatedInFuture: null }
  | { InsufficientFunds: { balance: ICP } };
export type TransferResult = { Ok: BlockIndex } | { Err: TransferError };
export default interface _SERVICE {
  account_balance: (arg_0: AccountBalanceArgs) => Promise<ICP>;
  transfer: (arg_0: TransferArgs) => Promise<TransferResult>;
}
