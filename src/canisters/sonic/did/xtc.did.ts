import { IDL } from "@dfinity/candid";
import type { Principal } from "@dfinity/principal";

export namespace XTCIDL {
  export type BurnError =
    | { InsufficientBalance: null }
    | { InvalidTokenContract: null }
    | { NotSufficientLiquidity: null };
  export type BurnResult = { Ok: TransactionId } | { Err: BurnError };
  export type CreateResult =
    | { Ok: { canister_id: Principal } }
    | { Err: string };
  export interface Event {
    fee: bigint;
    status: TransactionStatus;
    kind: EventDetail;
    cycles: bigint;
    timestamp: bigint;
  }
  export type EventDetail =
    | {
        Approve: { to: Principal; from: Principal };
      }
    | { Burn: { to: Principal; from: Principal } }
    | { Mint: { to: Principal } }
    | { CanisterCreated: { from: Principal; canister: Principal } }
    | {
        CanisterCalled: {
          from: Principal;
          method_name: string;
          canister: Principal;
        };
      }
    | { Transfer: { to: Principal; from: Principal } }
    | {
        TransferFrom: {
          to: Principal;
          from: Principal;
          caller: Principal;
        };
      };
  export interface EventsConnection {
    data: Array<Event>;
    next_offset: TransactionId;
    next_canister_id: [] | [Principal];
  }
  export interface Metadata {
    fee: bigint;
    decimals: number;
    owner: Principal;
    logo: string;
    name: string;
    totalSupply: bigint;
    symbol: string;
  }
  export type MintError = { NotSufficientLiquidity: null };
  export type MintResult = { Ok: TransactionId } | { Err: MintError };
  export type Operation =
    | { transferFrom: null }
    | { burn: null }
    | { mint: null }
    | { approve: null }
    | { canisterCalled: null }
    | { transfer: null }
    | { canisterCreated: null };
  export type ResultCall = { Ok: { return: Array<number> } } | { Err: string };
  export type ResultSend = { Ok: null } | { Err: string };
  export interface Stats {
    fee: bigint;
    transfers_count: bigint;
    balance: bigint;
    mints_count: bigint;
    transfers_from_count: bigint;
    canisters_created_count: bigint;
    supply: bigint;
    burns_count: bigint;
    approvals_count: bigint;
    proxy_calls_count: bigint;
    history_events: bigint;
  }
  export type Time = bigint;
  export type TransactionId = bigint;
  export type TransactionStatus = { FAILED: null } | { SUCCEEDED: null };
  export type TxError =
    | { NotifyDfxFailed: null }
    | { InsufficientAllowance: null }
    | { UnexpectedCyclesResponse: null }
    | { InsufficientBalance: null }
    | { InsufficientXTCFee: null }
    | { ErrorOperationStyle: null }
    | { Unauthorized: null }
    | { LedgerTrap: null }
    | { ErrorTo: null }
    | { Other: null }
    | { FetchRateFailed: null }
    | { BlockUsed: null }
    | { AmountTooSmall: null };
  export type TxReceipt = { Ok: bigint } | { Err: TxError };
  export type TxReceiptLegacy =
    | { Ok: bigint }
    | {
        Err: { InsufficientAllowance: null } | { InsufficientBalance: null };
      };
  export interface TxRecord {
    op: Operation;
    to: Principal;
    fee: bigint;
    status: TransactionStatus;
    from: Principal;
    timestamp: Time;
    caller: [] | [Principal];
    index: bigint;
    amount: bigint;
  }
  export interface _SERVICE {
    allowance: (arg_0: Principal, arg_1: Principal) => Promise<bigint>;
    approve: (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>;
    balance: (arg_0: [] | [Principal]) => Promise<bigint>;
    balanceOf: (arg_0: Principal) => Promise<bigint>;
    burn: (arg_0: {
      canister_id: Principal;
      amount: bigint;
    }) => Promise<BurnResult>;
    decimals: () => Promise<number>;
    events: (arg_0: {
      offset: [] | [bigint];
      limit: number;
    }) => Promise<EventsConnection>;
    getBlockUsed: () => Promise<Array<bigint>>;
    getMetadata: () => Promise<Metadata>;
    getTransaction: (arg_0: bigint) => Promise<TxRecord>;
    getTransactions: (arg_0: bigint, arg_1: bigint) => Promise<Array<TxRecord>>;
    get_map_block_used: (arg_0: bigint) => Promise<[] | [bigint]>;
    get_transaction: (arg_0: TransactionId) => Promise<[] | [Event]>;
    halt: () => Promise<undefined>;
    historySize: () => Promise<bigint>;
    isBlockUsed: (arg_0: bigint) => Promise<boolean>;
    logo: () => Promise<string>;
    mint: (arg_0: Principal, arg_1: bigint) => Promise<MintResult>;
    mint_by_icp: (
      arg_0: [] | [Array<number>],
      arg_1: bigint,
    ) => Promise<TxReceipt>;
    name: () => Promise<string>;
    nameErc20: () => Promise<string>;
    stats: () => Promise<Stats>;
    symbol: () => Promise<string>;
    totalSupply: () => Promise<bigint>;
    transfer: (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>;
    transferErc20: (
      arg_0: Principal,
      arg_1: bigint,
    ) => Promise<TxReceiptLegacy>;
    transferFrom: (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: bigint,
    ) => Promise<TxReceipt>;
    wallet_balance: () => Promise<{ amount: bigint }>;
    wallet_call: (arg_0: {
      args: Array<number>;
      cycles: bigint;
      method_name: string;
      canister: Principal;
    }) => Promise<ResultCall>;
    wallet_create_canister: (arg_0: {
      controller: [] | [Principal];
      cycles: bigint;
    }) => Promise<CreateResult>;
    wallet_create_wallet: (arg_0: {
      controller: [] | [Principal];
      cycles: bigint;
    }) => Promise<CreateResult>;
    wallet_send: (arg_0: {
      canister: Principal;
      amount: bigint;
    }) => Promise<ResultSend>;
  }

  export const factory: IDL.InterfaceFactory = ({ IDL }) => {
    const TxError = IDL.Variant({
      NotifyDfxFailed: IDL.Null,
      InsufficientAllowance: IDL.Null,
      UnexpectedCyclesResponse: IDL.Null,
      InsufficientBalance: IDL.Null,
      InsufficientXTCFee: IDL.Null,
      ErrorOperationStyle: IDL.Null,
      Unauthorized: IDL.Null,
      LedgerTrap: IDL.Null,
      ErrorTo: IDL.Null,
      Other: IDL.Null,
      FetchRateFailed: IDL.Null,
      BlockUsed: IDL.Null,
      AmountTooSmall: IDL.Null,
    });
    const TxReceipt = IDL.Variant({ Ok: IDL.Nat, Err: TxError });
    const TransactionId = IDL.Nat64;
    const BurnError = IDL.Variant({
      InsufficientBalance: IDL.Null,
      InvalidTokenContract: IDL.Null,
      NotSufficientLiquidity: IDL.Null,
    });
    const BurnResult = IDL.Variant({ Ok: TransactionId, Err: BurnError });
    const TransactionStatus = IDL.Variant({
      FAILED: IDL.Null,
      SUCCEEDED: IDL.Null,
    });
    const EventDetail = IDL.Variant({
      Approve: IDL.Record({ to: IDL.Principal, from: IDL.Principal }),
      Burn: IDL.Record({ to: IDL.Principal, from: IDL.Principal }),
      Mint: IDL.Record({ to: IDL.Principal }),
      CanisterCreated: IDL.Record({
        from: IDL.Principal,
        canister: IDL.Principal,
      }),
      CanisterCalled: IDL.Record({
        from: IDL.Principal,
        method_name: IDL.Text,
        canister: IDL.Principal,
      }),
      Transfer: IDL.Record({ to: IDL.Principal, from: IDL.Principal }),
      TransferFrom: IDL.Record({
        to: IDL.Principal,
        from: IDL.Principal,
        caller: IDL.Principal,
      }),
    });
    const Event = IDL.Record({
      fee: IDL.Nat64,
      status: TransactionStatus,
      kind: EventDetail,
      cycles: IDL.Nat64,
      timestamp: IDL.Nat64,
    });
    const EventsConnection = IDL.Record({
      data: IDL.Vec(Event),
      next_offset: TransactionId,
      next_canister_id: IDL.Opt(IDL.Principal),
    });
    const Metadata = IDL.Record({
      fee: IDL.Nat,
      decimals: IDL.Nat8,
      owner: IDL.Principal,
      logo: IDL.Text,
      name: IDL.Text,
      totalSupply: IDL.Nat,
      symbol: IDL.Text,
    });
    const Operation = IDL.Variant({
      transferFrom: IDL.Null,
      burn: IDL.Null,
      mint: IDL.Null,
      approve: IDL.Null,
      canisterCalled: IDL.Null,
      transfer: IDL.Null,
      canisterCreated: IDL.Null,
    });
    const Time = IDL.Int;
    const TxRecord = IDL.Record({
      op: Operation,
      to: IDL.Principal,
      fee: IDL.Nat,
      status: TransactionStatus,
      from: IDL.Principal,
      timestamp: Time,
      caller: IDL.Opt(IDL.Principal),
      index: IDL.Nat,
      amount: IDL.Nat,
    });
    const MintError = IDL.Variant({ NotSufficientLiquidity: IDL.Null });
    const MintResult = IDL.Variant({ Ok: TransactionId, Err: MintError });
    const Stats = IDL.Record({
      fee: IDL.Nat,
      transfers_count: IDL.Nat64,
      balance: IDL.Nat64,
      mints_count: IDL.Nat64,
      transfers_from_count: IDL.Nat64,
      canisters_created_count: IDL.Nat64,
      supply: IDL.Nat,
      burns_count: IDL.Nat64,
      approvals_count: IDL.Nat64,
      proxy_calls_count: IDL.Nat64,
      history_events: IDL.Nat64,
    });
    const TxReceiptLegacy = IDL.Variant({
      Ok: IDL.Nat,
      Err: IDL.Variant({
        InsufficientAllowance: IDL.Null,
        InsufficientBalance: IDL.Null,
      }),
    });
    const ResultCall = IDL.Variant({
      Ok: IDL.Record({ return: IDL.Vec(IDL.Nat8) }),
      Err: IDL.Text,
    });
    const CreateResult = IDL.Variant({
      Ok: IDL.Record({ canister_id: IDL.Principal }),
      Err: IDL.Text,
    });
    const ResultSend = IDL.Variant({ Ok: IDL.Null, Err: IDL.Text });
    return IDL.Service({
      allowance: IDL.Func([IDL.Principal, IDL.Principal], [IDL.Nat], ["query"]),
      approve: IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
      balance: IDL.Func([IDL.Opt(IDL.Principal)], [IDL.Nat64], []),
      balanceOf: IDL.Func([IDL.Principal], [IDL.Nat], ["query"]),
      burn: IDL.Func(
        [IDL.Record({ canister_id: IDL.Principal, amount: IDL.Nat64 })],
        [BurnResult],
        [],
      ),
      decimals: IDL.Func([], [IDL.Nat8], ["query"]),
      events: IDL.Func(
        [IDL.Record({ offset: IDL.Opt(IDL.Nat64), limit: IDL.Nat16 })],
        [EventsConnection],
        ["query"],
      ),
      getBlockUsed: IDL.Func([], [IDL.Vec(IDL.Nat64)], ["query"]),
      getMetadata: IDL.Func([], [Metadata], ["query"]),
      getTransaction: IDL.Func([IDL.Nat], [TxRecord], []),
      getTransactions: IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(TxRecord)], []),
      get_map_block_used: IDL.Func(
        [IDL.Nat64],
        [IDL.Opt(IDL.Nat64)],
        ["query"],
      ),
      get_transaction: IDL.Func([TransactionId], [IDL.Opt(Event)], []),
      halt: IDL.Func([], [], []),
      historySize: IDL.Func([], [IDL.Nat], ["query"]),
      isBlockUsed: IDL.Func([IDL.Nat64], [IDL.Bool], ["query"]),
      logo: IDL.Func([], [IDL.Text], ["query"]),
      mint: IDL.Func([IDL.Principal, IDL.Nat], [MintResult], []),
      mint_by_icp: IDL.Func(
        [IDL.Opt(IDL.Vec(IDL.Nat8)), IDL.Nat64],
        [TxReceipt],
        [],
      ),
      name: IDL.Func([], [IDL.Text], ["query"]),
      nameErc20: IDL.Func([], [IDL.Text], ["query"]),
      stats: IDL.Func([], [Stats], ["query"]),
      symbol: IDL.Func([], [IDL.Text], ["query"]),
      totalSupply: IDL.Func([], [IDL.Nat], ["query"]),
      transfer: IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
      transferErc20: IDL.Func([IDL.Principal, IDL.Nat], [TxReceiptLegacy], []),
      transferFrom: IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [TxReceipt],
        [],
      ),
      wallet_balance: IDL.Func(
        [],
        [IDL.Record({ amount: IDL.Nat64 })],
        ["query"],
      ),
      wallet_call: IDL.Func(
        [
          IDL.Record({
            args: IDL.Vec(IDL.Nat8),
            cycles: IDL.Nat64,
            method_name: IDL.Text,
            canister: IDL.Principal,
          }),
        ],
        [ResultCall],
        [],
      ),
      wallet_create_canister: IDL.Func(
        [
          IDL.Record({
            controller: IDL.Opt(IDL.Principal),
            cycles: IDL.Nat64,
          }),
        ],
        [CreateResult],
        [],
      ),
      wallet_create_wallet: IDL.Func(
        [
          IDL.Record({
            controller: IDL.Opt(IDL.Principal),
            cycles: IDL.Nat64,
          }),
        ],
        [CreateResult],
        [],
      ),
      wallet_send: IDL.Func(
        [IDL.Record({ canister: IDL.Principal, amount: IDL.Nat64 })],
        [ResultSend],
        [],
      ),
    });
  };
}
