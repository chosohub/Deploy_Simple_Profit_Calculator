import type {CalSelection, Market, Platform} from "../../components/constants/formSelectionsConstants.ts";
import type {CalFormData} from "../../components/constants/formDataInterfaces.ts";
import {TIGER_HK_OPTIONS, TIGER_HK_STOCKS, TIGER_US_OPTIONS, TIGER_US_STOCKS} from "./tiger/commissionsAndFees.ts";
import {FUTU_HK_OPTIONS, FUTU_HK_STOCKS, FUTU_US_OPTIONS, FUTU_US_STOCKS} from "./futu/commissionsAndFees.ts";
import {WEBULL_HK_STOCKS, WEBULL_US_STOCKS, WEBULL_HK_OPTIONS, WEBULL_US_OPTIONS} from "./webull/commissionsAndFees.ts";
import {roundUpToCent} from "../roundingFunc.ts";


export const profitAndLossCalculation = (formData: CalFormData) => {
    const {sellPrice, market, buyColumnList, sellQuantity, platform, isCommissionFree, selectedCal} = formData
    const sellTradeValue = +sellPrice * +sellQuantity;

    const buyQuantity = buyColumnList.map(value => value.buyQuantity)
    const buyPrice = buyColumnList.map(value => value.buyPrice)

    const netBuy = getNetBuyValue(buyQuantity, buyPrice, isCommissionFree, platform, market, selectedCal)
    const netSell = sellTradeValue - (selectedCal === 'STOCK' ? stockFeeCalculator(sellTradeValue, sellQuantity === "" ? 0 : sellQuantity, isCommissionFree, platform, market, true) : optionFeeCalculator(sellTradeValue, sellQuantity === "" ? 0 : sellQuantity, sellPrice === "" ? 0 : sellPrice, isCommissionFree, platform, market, true))

    return netSell - netBuy;
}

const getNetBuyValue = (buyQuantity: (number | "")[], buyPrice: (number | "")[], isCommissionFree: boolean, platform: Platform, market: Market, selectedCal: CalSelection) => {
    let netTotalBuy = 0;
    buyQuantity.map((value, index) => {
        const quantity = +value;
        const buyTradeValue = +buyPrice[index] * +value;
        if (selectedCal === "STOCK") {
            netTotalBuy += buyTradeValue - stockFeeCalculator(buyTradeValue, quantity, isCommissionFree, platform, market)
        } else {
            const price = +buyPrice[index];
            netTotalBuy += buyTradeValue - optionFeeCalculator(buyTradeValue, price, quantity, isCommissionFree, platform, market)
        }
    })

    return netTotalBuy;
}

const stockFeeCalculator = (tradeValue: number, quantity: number, isCommissionFree: boolean, platform: Platform, market: Market, isSell: boolean = false) => {
    switch (platform) {
        case "TIGER": {
            if (market === "US") {
                const commission = Math.max(TIGER_US_STOCKS.minCommission, roundUpToCent(TIGER_US_STOCKS.commissionPerShare * quantity))
                const platformFee = Math.min(tradeValue * 0.005, Math.max(TIGER_US_STOCKS.minPlatformFee, roundUpToCent(TIGER_US_STOCKS.platformFeePerShare * quantity)))
                const settlementFee = Math.min(roundUpToCent(TIGER_US_STOCKS.settlementPerShare * quantity), roundUpToCent(TIGER_US_STOCKS.maxSettlement * tradeValue))

                if (isSell) {
                    const sec = Math.max(roundUpToCent(TIGER_US_STOCKS.secRateSell * tradeValue), TIGER_US_STOCKS.minSec)
                    const finra = Math.min(TIGER_US_STOCKS.maxFinra, Math.max(TIGER_US_STOCKS.minFinra, roundUpToCent(TIGER_US_STOCKS.finraPerShareSell * quantity)))

                    return roundUpToCent(commission + platformFee + settlementFee + sec + finra)
                }

                return roundUpToCent(commission + platformFee + settlementFee)

            } else if (market === "HK") {
                const commission = isCommissionFree ? 0 : roundUpToCent(TIGER_HK_STOCKS.commissionRate * tradeValue)
                const platformFee = TIGER_HK_STOCKS.platformFeeFixed
                const tradingFee = Math.max(TIGER_HK_STOCKS.minTradingFee, roundUpToCent(TIGER_HK_STOCKS.tradingFeeRate * tradeValue))
                const stampDuty = Math.ceil(tradeValue * TIGER_HK_STOCKS.stampDutyRate)
                const sfc = Math.max(TIGER_HK_STOCKS.minSFC, roundUpToCent(TIGER_HK_STOCKS.sfcRate * tradeValue))
                const afrc = Math.max(TIGER_HK_STOCKS.minAFRC, roundUpToCent(TIGER_HK_STOCKS.afrcRate * tradeValue))
                const settlementFee = Math.max(TIGER_HK_STOCKS.minSettlement, roundUpToCent(TIGER_HK_STOCKS.settlementRate * tradeValue))

                return roundUpToCent(commission + platformFee + tradingFee + stampDuty + sfc + afrc + settlementFee)
            }

            return 0
        }

        case "FUTU": {
            if (market === "US") {
                const commission = Math.max(FUTU_US_STOCKS.minCommission, roundUpToCent(FUTU_US_STOCKS.commissionPerShare * quantity))
                const platformFee = Math.max(FUTU_US_STOCKS.minPlatformFee, roundUpToCent(FUTU_US_STOCKS.platformFeePerShare * quantity))
                const settlementFee = FUTU_US_STOCKS.settlementPerShare * quantity

                const sellRelatedFees = isSell ? Math.max(roundUpToCent(FUTU_US_STOCKS.secRateSell * tradeValue), FUTU_US_STOCKS.minSec) + Math.min(FUTU_US_STOCKS.maxFinra, Math.max(FUTU_US_STOCKS.minFinra, roundUpToCent(FUTU_US_STOCKS.finraPerShareSell * quantity))) : 0

                return roundUpToCent(commission + platformFee + settlementFee + sellRelatedFees)
            } else if (market === "HK") {
                const commission = isCommissionFree ? 0 : Math.max(roundUpToCent(FUTU_HK_STOCKS.commissionRate * tradeValue), FUTU_HK_STOCKS.minCommission)
                const platformFee = FUTU_HK_STOCKS.platformFeeFixed
                const settlementFee = roundUpToCent(FUTU_HK_STOCKS.settlementRate * tradeValue)
                const stampDuty = Math.ceil(tradeValue * FUTU_HK_STOCKS.stampDutyRate)
                const tradingFee = Math.max(FUTU_HK_STOCKS.minTradingFee, roundUpToCent(FUTU_HK_STOCKS.tradingFeeRate * tradeValue))
                const sfc = Math.max(FUTU_HK_STOCKS.minSFC, roundUpToCent(FUTU_HK_STOCKS.sfcRate * tradeValue))
                const frc = roundUpToCent(FUTU_HK_STOCKS.frcRate * tradeValue)

                return roundUpToCent(commission + platformFee + tradingFee + stampDuty + sfc + frc + settlementFee)
            }
            return 0;
        }
        case "WEBULL": {
            if (market === "US") {
                const rawCommission = isCommissionFree
                    ? 0
                    : Math.max(WEBULL_US_STOCKS.minCommission, WEBULL_US_STOCKS.commissionRate * tradeValue);
                const commission = roundUpToCent(rawCommission);

                // Platform fee: $0.005/share, min $1.00, max 0.5% of trade value
                const rawPlatformFee = Math.max(WEBULL_US_STOCKS.minPlatformFee, WEBULL_US_STOCKS.platformFeePerShare * quantity);
                const platformFee = roundUpToCent(Math.min(tradeValue * WEBULL_US_STOCKS.maxPlatformFeeRate, rawPlatformFee));

                // Settlement fee: $0.003/share, max 7% of trade value
                const settlementFee = roundUpToCent(Math.min(
                    WEBULL_US_STOCKS.settlementPerShare * quantity,
                    tradeValue * WEBULL_US_STOCKS.maxSettlementRate
                ));

                // Sell-related regulatory fees rounded up to nearest cent per component
                const secFee = roundUpToCent(Math.max(WEBULL_US_STOCKS.secRateSell * tradeValue, WEBULL_US_STOCKS.minSec));
                const finraFee = roundUpToCent(Math.min(
                    WEBULL_US_STOCKS.maxFinra,
                    Math.max(WEBULL_US_STOCKS.minFinra, WEBULL_US_STOCKS.finraPerShareSell * quantity)
                ));

                const sellRelatedFees = isSell ? secFee + finraFee : 0;

                return roundUpToCent(commission + platformFee + settlementFee + sellRelatedFees);
            }

            if (market === "HK") {
                const rawCommission = isCommissionFree
                    ? 0
                    : Math.max(WEBULL_HK_STOCKS.minCommission, WEBULL_HK_STOCKS.commissionRate * tradeValue);
                const commission = roundUpToCent(rawCommission);

                const platformFee = WEBULL_HK_STOCKS.platformFeeFixed;
                const tradingFee = roundUpToCent(Math.max(WEBULL_HK_STOCKS.minTradingFee, WEBULL_HK_STOCKS.tradingFeeRate * tradeValue));

                // HK Stamp Duty rounds up to nearest whole dollar
                const stampDuty = Math.ceil(tradeValue * WEBULL_HK_STOCKS.stampDutyRate);
                const sfc = roundUpToCent(Math.max(WEBULL_HK_STOCKS.minSFC, WEBULL_HK_STOCKS.sfcRate * tradeValue));
                const afrc = roundUpToCent(Math.max(WEBULL_HK_STOCKS.minAFRC, WEBULL_HK_STOCKS.afrcRate * tradeValue));

                // HKEX CCASS Settlement Fee (0.002%, Min HK$2.00)
                const settlementFee = roundUpToCent(Math.max(WEBULL_HK_STOCKS.minSettlement, WEBULL_HK_STOCKS.settlementRate * tradeValue));

                return roundUpToCent(commission + platformFee + tradingFee + stampDuty + sfc + afrc + settlementFee);
            }

            return 0;
        }
        default:
            return 0
    }
}

const optionFeeCalculator = (tradeValue: number, price: number, quantity: number, isCommissionFree: boolean, platform: Platform, market: Market, isSell: boolean = false) => {
    switch (platform) {
        case "TIGER": {
            if (market === 'HK') {
                //trade fees
                const commission = Math.max(TIGER_HK_OPTIONS.commissionRate * tradeValue, TIGER_HK_OPTIONS.minCommission)
                const platformFee = TIGER_HK_OPTIONS.platformFeeFixed
                const hkex = price <= 0.01 ? 0 : quantity * TIGER_HK_OPTIONS.tradingTariffTier1

                return commission + platformFee + hkex
            }

            if (market === 'US') {
                const commission = isCommissionFree ? 0 : Math.max(TIGER_US_OPTIONS.minCommission, TIGER_US_OPTIONS.commissionPerContract * quantity)
                const platformFee = Math.max(TIGER_US_OPTIONS.minPlatformFee, TIGER_US_OPTIONS.platformFeePerContract * quantity)
                const orf = TIGER_US_OPTIONS.orfPerContract * quantity
                const occ = TIGER_US_OPTIONS.occPerContract * quantity
                const cat = TIGER_US_OPTIONS.catPerContract * quantity

                const sellRelatedFees = isSell ? (Math.max(TIGER_US_OPTIONS.secRateSell * tradeValue, TIGER_US_OPTIONS.minSec) + Math.max(TIGER_US_OPTIONS.minFinra, TIGER_US_OPTIONS.firnaContractSell * quantity)) : 0

                return commission + platformFee + orf + occ + cat + sellRelatedFees
            }
            return 0
        }

        case "FUTU": {
            if (market === 'HK') {
                const commission = Math.max(FUTU_HK_OPTIONS.commissionRate * tradeValue, FUTU_HK_OPTIONS.minCommission)
                const platformFee = FUTU_HK_OPTIONS.platformFeeFixed
                const tradingTariff = price <= 0.01 ? 0 : quantity * FUTU_HK_OPTIONS.tradingTariffTier1

                return commission + platformFee + tradingTariff
            }

            if (market === 'US') {
                const commission = Math.max(FUTU_US_OPTIONS.minCommission, FUTU_US_OPTIONS.commissionPerContract * quantity)
                const platformFee = FUTU_US_OPTIONS.platformFeePerContract * quantity
                const orf = FUTU_US_OPTIONS.orfPerContract * quantity
                const occ = Math.min(FUTU_US_OPTIONS.occPerContract * quantity, FUTU_US_OPTIONS.maxOccPerTrade)
                const settlement = FUTU_US_OPTIONS.settlementPerContract * quantity
                const cat = FUTU_US_OPTIONS.catPerContract * quantity


                const sellRelatedFees = isSell ? (Math.max(FUTU_US_OPTIONS.secRateSell * tradeValue, FUTU_US_OPTIONS.minSec) + Math.max(FUTU_US_OPTIONS.firnaContractSell * quantity, FUTU_US_OPTIONS.minFinra)) : 0

                return commission + platformFee + orf + occ + settlement + cat + sellRelatedFees
            }
            return 0
        }

        case "WEBULL": {
            if (market === "HK") {
                const rawCommission = Math.max(WEBULL_HK_OPTIONS.commissionRate * tradeValue, WEBULL_HK_OPTIONS.minCommission);
                const commission = roundUpToCent(rawCommission);
                const platformFee = WEBULL_HK_OPTIONS.platformFeeFixed;
                const hkex = price <= 0.01 ? 0 : roundUpToCent(quantity * WEBULL_HK_OPTIONS.tradingTariffTier1);

                return commission + platformFee + hkex;
            }

            if (market === "US") {
                const commission = isCommissionFree
                    ? 0
                    : roundUpToCent(WEBULL_US_OPTIONS.commissionPerContract * quantity);

                const platformFee = roundUpToCent(Math.max(WEBULL_US_OPTIONS.minPlatformFee, WEBULL_US_OPTIONS.platformFeePerContract * quantity));
                const orf = roundUpToCent(WEBULL_US_OPTIONS.orfPerContract * quantity);
                const occ = roundUpToCent(WEBULL_US_OPTIONS.occPerContract * quantity);
                const cat = roundUpToCent(WEBULL_US_OPTIONS.catPerContract * quantity);

                const secFee = roundUpToCent(Math.max(WEBULL_US_OPTIONS.secRateSell * tradeValue, WEBULL_US_OPTIONS.minSec));
                const finraFee = roundUpToCent(Math.max(WEBULL_US_OPTIONS.minFinra, WEBULL_US_OPTIONS.finraContractSell * quantity));

                const sellRelatedFees = isSell ? secFee + finraFee : 0;

                return commission + platformFee + orf + occ + cat + sellRelatedFees;
            }

            return 0;
        }

        default:
            return 0
    }
}

