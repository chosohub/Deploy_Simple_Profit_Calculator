// US Stocks & ETFs
export const WEBULL_US_STOCKS = {
    commissionRate: 0,
    minCommission: 0,
    platformFeePerShare: 0.005,
    minPlatformFee: 1.00,
    maxPlatformFeeRate: 0.005, // 0.5% cap
    settlementPerShare: 0.003,
    maxSettlementRate: 0.07,   // 7% cap
    secRateSell: 0.0000278,
    minSec: 0.01,
    finraPerShareSell: 0.000166,
    minFinra: 0.01,
    maxFinra: 8.30
};

// HK Stocks
export const WEBULL_HK_STOCKS = {
    commissionRate: 0.00025,
    minCommission: 0,
    platformFeeFixed: 10.00, // HK$10 flat platform fee
    tradingFeeRate: 0.0000565,
    minTradingFee: 0.01,
    stampDutyRate: 0.001,   // 0.1%
    sfcRate: 0.000027,
    minSFC: 0.01,
    afrcRate: 0.0000015,
    minAFRC: 0.01,
    settlementRate: 0.00002,
    minSettlement: 2.00     // HKEX CCASS HK$2 floor
};

// US Options
export const WEBULL_US_OPTIONS = {
    commissionPerContract: 0,
    platformFeePerContract: 0.55,
    minPlatformFee: 0.55,
    orfPerContract: 0.02815,
    occPerContract: 0.02,
    catPerContract: 0.000033,
    secRateSell: 0.0000278,
    minSec: 0.01,
    finraContractSell: 0.00279,
    minFinra: 0.01
};

// HK Options
export const WEBULL_HK_OPTIONS = {
    commissionRate: 0.00025,
    minCommission: 0,
    platformFeeFixed: 10.00,
    tradingTariffTier1: 0.50
};