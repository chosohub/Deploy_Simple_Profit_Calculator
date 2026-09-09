import type {CalSelection, Platform, Market} from "./formSelectionsConstants.ts";

export interface CalFormData {
    selectedCal: CalSelection;
    platform: Platform;
    market: Market;
    buyColumnList: BuyColumn[]
    sellQuantity: number | '';
    sellPrice: number | '';
    isCommissionFree: boolean
}

export interface BuyColumn {
    id: string
    buyQuantity: '' | number;
    buyPrice: '' | number;
}


export const getDefaultFormData = (): CalFormData => ({
    selectedCal: 'STOCK',
    platform: "TIGER",
    market: 'US',
    buyColumnList: [{id: crypto.randomUUID(), buyQuantity: "", buyPrice: ""}],
    sellQuantity: '',
    sellPrice: '',
    isCommissionFree: false,
})

export interface FormErrors {
    buyQuantity?: string[];
    buyPrice?: string[];
    sellQuantity?: string;
    sellPrice?: string;
}