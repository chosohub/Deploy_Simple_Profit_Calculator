import type {BuyColumn} from "../components/constants/formDataInterfaces.ts";

export const sumOfBuyQuantity = (buyColumnList: BuyColumn[]) => {
    const result = buyColumnList
        .map(value => value.buyQuantity)
        .reduce((acc, curr) => {
            return (acc === '' ? 0 : acc) + (curr === '' ? 0 : curr)
        }, 0)

    return result === 0 ? '' : result;
};