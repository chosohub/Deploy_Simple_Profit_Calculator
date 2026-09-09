// tigerFeeSchedules.ts

export const TIGER_HK_STOCKS = {
    currency: 'HKD',
    commissionRate: 0.00029,          // Promo: 0% (Standard: 0.029%)
    minCommission: 0.0,
    platformFeeFixed: 15.0, // Fixed Plan: HKD 15 / order
    tradingFeeRate: 0.0000565,
    minTradingFee: 0.01,
    stampDutyRate: 0.001,
    hkexRate: 0.0000565,          // 0.00565%
    sfcRate: 0.000027,            // 0.0027%
    minSFC: 0.01,// 0.1% (rounded UP)
    afrcRate: 0.0000015,          // 0.00015%
    minAFRC: 0.01,
    settlementRate: 0.000042,// 0.0042%
    minSettlement: 0.01
} as const;

export const TIGER_HK_OPTIONS = {
    currency: 'HKD',
    commissionRate: 0.002,        // 0.2% * trade value
    minCommission: 3.0,           // Min HKD 3 / order
    platformFeeFixed: 15.0,       // HKD 15 / order
    tradingTariffTier1: 3.0,      // HKD 3.0 / contract
    tradingTariffTier2: 1.0,      // HKD 1.0 / contract
    tradingTariffTier3: 0.5,      // HKD 0.5 / contract
    exerciseFeePerContract: 2.0,  // HKD 2.0 / contract
} as const;

export const TIGER_US_STOCKS = {
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
    minSec:0.01,
    finraPerShareSell: 0.000195,    // FINRA TAF (Sell only)
    minFinra: 0.01,
    maxFinra: 9.79,
} as const;

export const TIGER_US_OPTIONS = {
    currency: 'USD',
    commissionPerContract: 0.65,   // USD 0 Promo (Standard: $0.65)
    minCommission: 0.99,           // USD 0 Promo (Standard: $0.99)
    platformFeePerContract: 0.30, // $0.30 / contract
    minPlatformFee: 0.99,         // Min $0.99 / order
    occPerContract: 0.025,        // OCC Fee
    orfPerContract: 0.012,        // ORF Fee
    catPerContract: 0.0003,       // CAT Fee
    secRateSell: 0.0000206,       // SEC Fee (Sell only)
    minSec: 0.01,
    firnaContractSell: 0.00329,  // FINRA TAF (Sell only)
    minFinra: 0.01,
} as const;