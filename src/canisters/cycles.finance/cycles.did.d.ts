import type { Principal } from "@dfinity/principal";
export type AccountId = Array<number>;
export type Address = string;
export type BalanceChange =
  | { DebitRecord: bigint }
  | { CreditRecord: bigint }
  | { NoChange: null };
export type BlockIndex = bigint;
export interface Config {
  FEE: [] | [bigint];
  MIN_ICP_E8S: [] | [bigint];
  ICP_LIMIT: [] | [bigint];
  MIN_CYCLES: [] | [bigint];
  MAX_STORAGE_TRIES: [] | [bigint];
  CYCLESFEE_RETENTION_RATE: [] | [bigint];
  STORAGE_CANISTER: [] | [string];
  MAX_CACHE_NUMBER_PER: [] | [bigint];
  MAX_CACHE_TIME: [] | [bigint];
  CYCLES_LIMIT: [] | [bigint];
  ICP_FEE: [] | [bigint];
}
export type CyclesAmount = bigint;
export interface CyclesMarket {
  add: (
    arg_0: Address,
    arg_1: [] | [Nonce],
    arg_2: [] | [Data],
  ) => Promise<TxnResult>;
  canister_status: () => Promise<canister_status>;
  claim: (
    arg_0: CyclesWallet,
    arg_1: [] | [Nonce],
    arg_2: [] | [Sa],
    arg_3: [] | [Data],
  ) => Promise<TxnResult>;
  count: (arg_0: [] | [Address]) => Promise<bigint>;
  cyclesToIcp: (
    arg_0: Address,
    arg_1: [] | [Nonce],
    arg_2: [] | [Data],
  ) => Promise<TxnResult>;
  feeStatus: () => Promise<FeeStatus>;
  getAccountId: (arg_0: Address) => Promise<string>;
  getConfig: () => Promise<Config>;
  getEvents: (arg_0: [] | [Address]) => Promise<Array<TxnRecord>>;
  icpToCycles: (
    arg_0: IcpE8s,
    arg_1: CyclesWallet,
    arg_2: [] | [Nonce],
    arg_3: [] | [Sa],
    arg_4: [] | [Data],
  ) => Promise<TxnResult>;
  lastTxids: (arg_0: [] | [Address]) => Promise<Array<Txid>>;
  liquidity: (arg_0: [] | [Address]) => Promise<Liquidity>;
  lpRewards: (arg_0: Address) => Promise<{ icp: bigint; cycles: bigint }>;
  remove: (
    arg_0: [] | [Shares],
    arg_1: CyclesWallet,
    arg_2: [] | [Nonce],
    arg_3: [] | [Sa],
    arg_4: [] | [Data],
  ) => Promise<TxnResult>;
  txnRecord: (arg_0: Txid) => Promise<[] | [TxnRecord]>;
  txnRecord2: (arg_0: Txid) => Promise<[] | [TxnRecord]>;
  version: () => Promise<string>;
  yield: () => Promise<
    [
      { apyCycles: number; apyIcp: number },
      { apyCycles: number; apyIcp: number },
    ]
  >;
}
export interface CyclesTransferLog {
  to: Principal;
  updateTime: Timestamp;
  status: TransStatus;
  value: CyclesAmount;
  from: Principal;
}
export type CyclesWallet = Principal;
export interface DRC207Support {
  timer: { interval_seconds: [] | [bigint]; enable: boolean };
  monitorable_by_self: boolean;
  monitorable_by_blackhole: {
    canister_id: [] | [Principal];
    allowed: boolean;
  };
  cycles_receivable: boolean;
}
export type Data = Array<number>;
export type ErrorAction =
  | { resendIcpCycles: null }
  | { resendIcp: null }
  | { fallback: null }
  | { resendCycles: null }
  | { delete: null };
export type ErrorLog =
  | {
      Withdraw: {
        time: Timestamp;
        user: AccountId;
        icpErrMsg: [] | [TransferError];
        cyclesErrMsg: string;
        credit: [CyclesWallet, CyclesAmount, AccountId, IcpE8s];
      };
    }
  | {
      IcpSaToMain: {
        time: Timestamp;
        user: AccountId;
        errMsg: TransferError;
        debit: [bigint, AccountId, IcpE8s];
      };
    };
export interface FeeStatus {
  fee: number;
  cumulFee: { icpBalance: IcpE8s; cyclesBalance: CyclesAmount };
  totalFee: { icpBalance: IcpE8s; cyclesBalance: CyclesAmount };
}
export interface ICP {
  e8s: bigint;
}
export type IcpE8s = bigint;
export interface IcpTransferLog {
  to: AccountId;
  fee: IcpE8s;
  updateTime: Timestamp;
  status: TransStatus;
  value: IcpE8s;
  from: AccountId;
}
export interface Liquidity {
  vol: Vol;
  shares: Shares;
  shareWeighted: ShareWeighted;
  unitValue: [number, number];
  icpE8s: IcpE8s;
  cycles: bigint;
  priceWeighted: PriceWeighted;
  swapCount: bigint;
}
export type Nonce = bigint;
export type OperationType =
  | { AddLiquidity: null }
  | { Swap: null }
  | { Claim: null }
  | { RemoveLiquidity: null };
export interface PriceWeighted {
  updateTime: Timestamp;
  icpTimeWeighted: bigint;
  cyclesTimeWeighted: bigint;
}
export type Sa = Array<number>;
export type ShareChange =
  | { Burn: Shares }
  | { Mint: Shares }
  | { NoChange: null };
export interface ShareWeighted {
  updateTime: Timestamp;
  shareTimeWeighted: bigint;
}
export type Shares = bigint;
export type Time = bigint;
export type Timestamp = bigint;
export type TokenType = { Icp: null } | { Token: Principal } | { Cycles: null };
export type TransStatus =
  | { Fallback: null }
  | { Success: null }
  | { Processing: null }
  | { Failure: null };
export type TransferError =
  | {
      TxTooOld: { allowed_window_nanos: bigint };
    }
  | { BadFee: { expected_fee: ICP } }
  | { TxDuplicate: { duplicate_of: BlockIndex } }
  | { TxCreatedInFuture: null }
  | { InsufficientFunds: { balance: ICP } };
export type Txid = Array<number>;
export interface TxnRecord {
  fee: { token0Fee: bigint; token1Fee: bigint };
  shares: ShareChange;
  msgCaller: [] | [Principal];
  data: [] | [Data];
  time: Time;
  txid: Txid;
  token0Value: BalanceChange;
  orderType: { AMM: null } | { OrderBook: null };
  token0: TokenType;
  token1: TokenType;
  nonce: Nonce;
  operation: OperationType;
  account: AccountId;
  details: Array<{
    token0Value: BalanceChange;
    counterparty: Txid;
    token1Value: BalanceChange;
  }>;
  caller: AccountId;
  token1Value: BalanceChange;
  index: bigint;
  cyclesWallet: [] | [CyclesWallet];
}
export type TxnResult =
  | {
      ok: {
        shares: ShareChange;
        icpE8s: BalanceChange;
        txid: Txid;
        cycles: BalanceChange;
      };
    }
  | {
      err: {
        code:
          | { InsufficientShares: null }
          | { PoolIsEmpty: null }
          | { NonceError: null }
          | { UndefinedError: null }
          | { UnacceptableVolatility: null }
          | { InvalidCyclesAmout: null }
          | { InvalidIcpAmout: null }
          | { IcpTransferException: null };
        message: string;
      };
    };
export interface Vol {
  swapIcpVol: IcpE8s;
  swapCyclesVol: CyclesAmount;
}
export interface canister_status {
  status: { stopped: null } | { stopping: null } | { running: null };
  memory_size: bigint;
  cycles: bigint;
  settings: definite_canister_settings;
  module_hash: [] | [Array<number>];
}
export interface definite_canister_settings {
  freezing_threshold: bigint;
  controllers: Array<Principal>;
  memory_allocation: bigint;
  compute_allocation: bigint;
}
export default CyclesMarket;
