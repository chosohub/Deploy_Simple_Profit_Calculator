// uSMART HK Stock Fee Constants (Supports multiple account plans)
export const USMART_HK_STOCKS = {
    PLANS: {
        STANDARD: {
            commissionRate: 0.0003,      // 0.03%
            minCommission: 0.00,
            platformFeeFixed: 12.00,
        },
        TRADER: {
            commissionRate: 0.00,        // 0.00%
            minCommission: 0.00,
            platformFeeFixed: 12.00,
        },
        PRO: {
            commissionRate: 0.0006,      // 0.06%
            minCommission: 0.00,
            platformFeeFixed: 18.00,
        },
        MANUAL: {
            commissionRate: 0.001,       // 0.10%
            minCommission: 100.00,       // HK$100 min
            platformFeeFixed: 0.00,
        },
        DAY_MARGIN: {
            commissionRate: 0.0005,      // 0.05%
            minCommission: 10.00,        // HK$10 min
            platformFeeFixed: 0.00,
        },
    },
    // Pass-through Exchange & Regulatory Fees
    tradingFeeRate: 0.0000565,       // HKEX Trading Fee (0.00565%, min HK$0.01)
    minTradingFee: 0.01,
    stampDutyRate: 0.001,            // HK Stamp Duty (0.1%)
    sfcRate: 0.000027,               // SFC Levy (0.0027%, min HK$0.01)
    minSFC: 0.01,
    afrcRate: 0.0000015,             // AFRC Levy (0.00015%)
    minAFRC: 0.01,
    settlementRate: 0.000042,        // CCASS Settlement (0.0042%)
    minSettlement: 2.00,             // HKEX CCASS HK$2.00 floor
};

// uSMART US Stock Fee Constants (Supports multiple account plans & order types)
export const USMART_US_STOCKS = {
    PLANS: {
        STANDARD: {
            commissionPerShare: 0.00,
            minCommission: 0.00,
            platformPerShare: 0.009,
            minPlatformFee: 1.88,
            maxPlatformCapRate: 0.01, // 1%
            isTieredByPrice: false,
        },
        DESIGNATED_STANDARD: {
            commissionPerShare: 0.00,
            minCommission: 0.00,
            platformPerShare: 0.009,
            minPlatformFee: 1.88,
            fixedPlatformFeeHighPrice: 0.99, // Shares >= $100
            maxPlatformCapRate: 0.01,
            isTieredByPrice: true,
        },
        TRADER_STANDARD: {
            commissionPerShare: 0.00,
            minCommission: 0.00,
            platformPerShare: 0.005,
            minPlatformFee: 1.00,
            maxPlatformCapRate: 0.01,
            isTieredByPrice: false,
        },
        TRADER_PROMO: {
            commissionPerShare: 0.00,
            minCommission: 0.00,
            platformPerShare: 0.005,
            minPlatformFee: 1.00,
            fixedPlatformFeeHighPrice: 0.99, // Shares >= $100
            maxPlatformCapRate: 0.01,
            isTieredByPrice: true,
        },
        PRO: {
            commissionPerShare: 0.01,
            minCommission: 1.00,
            maxCommissionCapRate: 0.005, // 0.5%
            platformPerShare: 0.009,
            minPlatformFee: 2.88,
            maxPlatformCapRate: 0.005,  // 0.5%
            isTieredByPrice: false,
        },
        DAY_MARGIN: {
            commissionRate: 0.0005, // 0.05% of trade value
            minCommission: 1.50,
            platformPerShare: 0.00,
            minPlatformFee: 0.00,
            isTieredByPrice: false,
        },
        OTC: {
            commissionPerShare: 0.00,
            minCommission: 0.00,
            platformPerShare: 0.019,
            minPlatformFee: 6.00,
            maxPlatformCapRate: 0.02, // 2%
            isTieredByPrice: false,
        },
    },

    FRACTIONAL_LESS_THAN_ONE: {
        commission: 0.00,
        platformFeeFixed: 0.99,
    },

    // US Pass-Through Regulatory & Clearing Fees
    settlementPerShare: 0.003,
    maxSettlementRate: 0.07,   // 7% cap
    secRateSell: 0.0000278,    // SEC rate on sell orders
    minSec: 0.01,
    finraPerShareSell: 0.000166, // FINRA TAF per share
    minFinra: 0.01,
    maxFinra: 8.30,
};

// uSMART US Options Fee Constants
export const USMART_US_OPTIONS = {
    PLANS: {
        STANDARD_AND_PRO: {
            commissionLowPremium: 0.00,  // Premium <= US$0.1
            commissionHighPremium: 0.45, // Premium > US$0.1
            platformFeePerContract: 0.30,
            minPlatformFee: 1.00,
        },
        TRADER: {
            commissionLowPremium: 0.00,  // Always $0
            commissionHighPremium: 0.00,
            platformFeePerContract: 0.40,
            minPlatformFee: 1.00,
        },
    },

    // Exchange & Clearing Fees (Both Buy & Sell)
    orfPerContract: 0.02295,       // Options Regulatory Fee
    occPerContract: 0.025,         // Options Clearing Corporation Fee
    exchangeFeePerContract: 0.18,  // Exchange Fee
    catPerContract: 0.0003,        // Consolidated Audit Trail Fee
    minCat: 0.01,

    // Sell-Related Regulatory Fees (FINRA TAF & SEC)
    secRateSell: 0.0000206,        // SEC fee on sell orders (0.00206%)
    minSec: 0.01,
    tafPerContractSell: 0.00329,   // FINRA TAF per contract on sell orders
    minTaf: 0.01,
};