export const FUTU_HK_STOCKS = {
    currency: 'HKD',
    commissionRate: 0.0003,          // Promo: 0% (Standard: 0.03%)
    minCommission: 3.0,
    platformFeeFixed: 15.0, // Fixed Plan: HKD 15 / order
    stampDutyRate: 0.001,
    tradingFeeRate: 0.0000565,          // 0.00565%
    minTradingFee: 0.01,
    sfcRate: 0.000027,
    minSFC: 0.01,
    frcRate: 0.0000015,            // 0.00015%
    settlementRate: 0.000042,// 0.0042%
} as const;

export const FUTU_HK_OPTIONS = {
    currency: 'HKD',
    commissionRate: 0.002,        // 0.2% * trade value
    minCommission: 3.0,           // Min HKD 3 / order
    platformFeeFixed: 15.0,       // HKD 15 / order
    tradingTariffTier1: 3.0,      // HKD 3.0 / contract
    tradingTariffTier2: 1.0,      // HKD 1.0 / contract
    tradingTariffTier3: 0.5,      // HKD 0.5 / contract
    exerciseFeePerContract: 2.0,  // HKD 2.0 / contract
} as const;

export const FUTU_US_STOCKS = {
    currency: 'USD',
    commissionPerShare: 0.0049,   // $0.0049 / share
    minCommission: 0.99,          // Min $0.99 / order
    maxCommissionPercent: 0.005,  // Capped at 0.5% trade value
    platformFeePerShare: 0.005,   // $0.005 / share
    minPlatformFee: 1.0,          // Min $1.00 / order
    maxPlatformPercent: 0.005,    // Capped at 0.5% trade value
    settlementPerShare: 0.003,
    maxSettlement: 0.07,  // $0.003 / share (max 7% trade value)
    catPerShareNms: 0.000003,     // NMS Stocks
    secRateSell: 0.0000206,       // SEC Fee (Sell only)
    minSec: 0.01,
    finraPerShareSell: 0.000195,    // FINRA TAF (Sell only)
    minFinra: 0.01,
    maxFinra: 9.79,
} as const;

export const FUTU_US_OPTIONS = {
    currency: 'USD',
    commissionPerContract: 0.65,   // (Standard: $0.65)
    minCommission: 1.99, // (Standard: $0.99)
    platformFeePerContract: 0.30, // $0.30 / contract
    secRateSell: 0.0000206,       // SEC Fee (Sell only)
    minSec: 0.01,
    firnaContractSell: 0.00329,  // FINRA TAF (Sell only)
    minFinra: 0.01,
    orfPerContract: 0.013, // ORF Fee
    occPerContract: 0.02,        // OCC Fee
    maxOccPerTrade: 55.0,
    settlementPerContract: 0.18,
    catPerContract: 0.0003,       // CAT Fee


} as const;