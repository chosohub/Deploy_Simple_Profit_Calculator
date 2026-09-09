import type {CalFormData} from "../components/constants/formDataInterfaces.ts";

export const validateFormData = (isCalculateClicked: boolean, formData: CalFormData) => {
    if (!isCalculateClicked) return {};

    const errs: { buyQuantity?: string[]; buyPrice?: string[]; sellQuantity?: string; sellPrice?: string } = {};

    // 1. Check buyQuantity for errors (e.g., 0, empty, or invalid)
    const qtyErrors = formData.buyColumnList
        .map((value) => ((value.buyQuantity === null || value.buyQuantity === "") ? value.id : null))
        .filter((idx): idx is string => idx !== null);

    if (qtyErrors.length > 0) errs.buyQuantity = qtyErrors;

    // 2. Check buyPrice for errors
    const priceErrors = formData.buyColumnList
        .map((value) => ((value.buyPrice === null || value.buyPrice === "") ? value.id : null))
        .filter((idx): idx is string => idx !== null);

    if (priceErrors.length > 0) errs.buyPrice = priceErrors;

    // 3. Check sellQuantity match
    let totalBuy = formData.buyColumnList.map(value => value.buyQuantity).reduce((a, b) => (a ? a : 0) + (b ? b : 0), 0);
    if (totalBuy === 0) {
        totalBuy = ""
    }
    if (formData.sellQuantity !== totalBuy) {
        errs.sellQuantity = 'Sell quantity should be equal to sum of buy quantity';
    }

    if (formData.sellPrice === "") {
        errs.sellPrice = "Sell price is required"
    }

    return errs;
}