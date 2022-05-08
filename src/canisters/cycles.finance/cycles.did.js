export const idlFactory = ({ IDL }) => {
  const Address = IDL.Text;
  const Nonce = IDL.Nat;
  const Data = IDL.Vec(IDL.Nat8);
  const Shares = IDL.Nat;
  const ShareChange = IDL.Variant({
    Burn: Shares,
    Mint: Shares,
    NoChange: IDL.Null,
  });
  const BalanceChange = IDL.Variant({
    DebitRecord: IDL.Nat,
    CreditRecord: IDL.Nat,
    NoChange: IDL.Null,
  });
  const Txid = IDL.Vec(IDL.Nat8);
  const TxnResult = IDL.Variant({
    ok: IDL.Record({
      shares: ShareChange,
      icpE8s: BalanceChange,
      txid: Txid,
      cycles: BalanceChange,
    }),
    err: IDL.Record({
      code: IDL.Variant({
        InsufficientShares: IDL.Null,
        PoolIsEmpty: IDL.Null,
        NonceError: IDL.Null,
        UndefinedError: IDL.Null,
        UnacceptableVolatility: IDL.Null,
        InvalidCyclesAmout: IDL.Null,
        InvalidIcpAmout: IDL.Null,
        IcpTransferException: IDL.Null,
      }),
      message: IDL.Text,
    }),
  });
  const definite_canister_settings = IDL.Record({
    freezing_threshold: IDL.Nat,
    controllers: IDL.Vec(IDL.Principal),
    memory_allocation: IDL.Nat,
    compute_allocation: IDL.Nat,
  });
  const canister_status = IDL.Record({
    status: IDL.Variant({
      stopped: IDL.Null,
      stopping: IDL.Null,
      running: IDL.Null,
    }),
    memory_size: IDL.Nat,
    cycles: IDL.Nat,
    settings: definite_canister_settings,
    module_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const CyclesWallet = IDL.Principal;
  const Sa = IDL.Vec(IDL.Nat8);
  const IcpE8s = IDL.Nat;
  const CyclesAmount = IDL.Nat;
  const FeeStatus = IDL.Record({
    fee: IDL.Float64,
    cumulFee: IDL.Record({
      icpBalance: IcpE8s,
      cyclesBalance: CyclesAmount,
    }),
    totalFee: IDL.Record({
      icpBalance: IcpE8s,
      cyclesBalance: CyclesAmount,
    }),
  });
  const Config = IDL.Record({
    FEE: IDL.Opt(IDL.Nat),
    MIN_ICP_E8S: IDL.Opt(IDL.Nat),
    ICP_LIMIT: IDL.Opt(IDL.Nat),
    MIN_CYCLES: IDL.Opt(IDL.Nat),
    MAX_STORAGE_TRIES: IDL.Opt(IDL.Nat),
    CYCLESFEE_RETENTION_RATE: IDL.Opt(IDL.Nat),
    STORAGE_CANISTER: IDL.Opt(IDL.Text),
    MAX_CACHE_NUMBER_PER: IDL.Opt(IDL.Nat),
    MAX_CACHE_TIME: IDL.Opt(IDL.Nat),
    CYCLES_LIMIT: IDL.Opt(IDL.Nat),
    ICP_FEE: IDL.Opt(IDL.Nat64),
  });
  const Time = IDL.Int;
  const TokenType = IDL.Variant({
    Icp: IDL.Null,
    Token: IDL.Principal,
    Cycles: IDL.Null,
  });
  const OperationType = IDL.Variant({
    AddLiquidity: IDL.Null,
    Swap: IDL.Null,
    Claim: IDL.Null,
    RemoveLiquidity: IDL.Null,
  });
  const AccountId = IDL.Vec(IDL.Nat8);
  const TxnRecord = IDL.Record({
    fee: IDL.Record({ token0Fee: IDL.Nat, token1Fee: IDL.Nat }),
    shares: ShareChange,
    msgCaller: IDL.Opt(IDL.Principal),
    data: IDL.Opt(Data),
    time: Time,
    txid: Txid,
    token0Value: BalanceChange,
    orderType: IDL.Variant({ AMM: IDL.Null, OrderBook: IDL.Null }),
    token0: TokenType,
    token1: TokenType,
    nonce: Nonce,
    operation: OperationType,
    account: AccountId,
    details: IDL.Vec(
      IDL.Record({
        token0Value: BalanceChange,
        counterparty: Txid,
        token1Value: BalanceChange,
      }),
    ),
    caller: AccountId,
    token1Value: BalanceChange,
    index: IDL.Nat,
    cyclesWallet: IDL.Opt(CyclesWallet),
  });
  const Vol = IDL.Record({
    swapIcpVol: IcpE8s,
    swapCyclesVol: CyclesAmount,
  });
  const Timestamp = IDL.Nat;
  const ShareWeighted = IDL.Record({
    updateTime: Timestamp,
    shareTimeWeighted: IDL.Nat,
  });
  const PriceWeighted = IDL.Record({
    updateTime: Timestamp,
    icpTimeWeighted: IDL.Nat,
    cyclesTimeWeighted: IDL.Nat,
  });
  const Liquidity = IDL.Record({
    vol: Vol,
    shares: Shares,
    shareWeighted: ShareWeighted,
    unitValue: IDL.Tuple(IDL.Float64, IDL.Float64),
    icpE8s: IcpE8s,
    cycles: IDL.Nat,
    priceWeighted: PriceWeighted,
    swapCount: IDL.Nat64,
  });
  const CyclesMarket = IDL.Service({
    add: IDL.Func([Address, IDL.Opt(Nonce), IDL.Opt(Data)], [TxnResult], []),
    canister_status: IDL.Func([], [canister_status], []),
    claim: IDL.Func(
      [CyclesWallet, IDL.Opt(Nonce), IDL.Opt(Sa), IDL.Opt(Data)],
      [TxnResult],
      [],
    ),
    count: IDL.Func([IDL.Opt(Address)], [IDL.Nat], ["query"]),
    cyclesToIcp: IDL.Func(
      [Address, IDL.Opt(Nonce), IDL.Opt(Data)],
      [TxnResult],
      [],
    ),
    feeStatus: IDL.Func([], [FeeStatus], ["query"]),
    getAccountId: IDL.Func([Address], [IDL.Text], ["query"]),
    getConfig: IDL.Func([], [Config], ["query"]),
    getEvents: IDL.Func([IDL.Opt(Address)], [IDL.Vec(TxnRecord)], ["query"]),
    icpToCycles: IDL.Func(
      [IcpE8s, CyclesWallet, IDL.Opt(Nonce), IDL.Opt(Sa), IDL.Opt(Data)],
      [TxnResult],
      [],
    ),
    lastTxids: IDL.Func([IDL.Opt(Address)], [IDL.Vec(Txid)], ["query"]),
    liquidity: IDL.Func([IDL.Opt(Address)], [Liquidity], ["query"]),
    lpRewards: IDL.Func(
      [Address],
      [IDL.Record({ icp: IDL.Nat, cycles: IDL.Nat })],
      ["query"],
    ),
    remove: IDL.Func(
      [
        IDL.Opt(Shares),
        CyclesWallet,
        IDL.Opt(Nonce),
        IDL.Opt(Sa),
        IDL.Opt(Data),
      ],
      [TxnResult],
      [],
    ),
    txnRecord: IDL.Func([Txid], [IDL.Opt(TxnRecord)], ["query"]),
    txnRecord2: IDL.Func([Txid], [IDL.Opt(TxnRecord)], []),
    version: IDL.Func([], [IDL.Text], ["query"]),
    yield: IDL.Func(
      [],
      [
        IDL.Record({ apyCycles: IDL.Float64, apyIcp: IDL.Float64 }),
        IDL.Record({ apyCycles: IDL.Float64, apyIcp: IDL.Float64 }),
      ],
      ["query"],
    ),
  });
  return CyclesMarket;
};
export const init = ({ IDL }) => {
  return [];
};
