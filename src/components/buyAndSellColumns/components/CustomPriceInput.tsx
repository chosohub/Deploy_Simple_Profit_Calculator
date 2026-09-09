import {Stack} from "@mui/material";
import {type CalSelection, type Market} from "../../constants/formSelectionsConstants.ts";
import ErrorMessage, {type ErrorMessageProps} from "./ErrorMessage.tsx";
import {StyledInputLabel, StyledNumericFormat} from "../../styledComponents/styledComponents.ts";
import type {NumberFormatValues} from "react-number-format";

type CustomPriceInputProps = {
    selectedCal: CalSelection;
    market: Market;
    price: number | '';
    handlePriceOnChange: (values: NumberFormatValues) => void;
    errorMessageProps: ErrorMessageProps
}


export default function CustomPriceInput({
                                             selectedCal,
                                             market,
                                             price,
                                             handlePriceOnChange,
                                             errorMessageProps
                                         }: CustomPriceInputProps) {
    return (
        <Stack spacing={0.5}>
            <StyledInputLabel variant={'caption'}>Price</StyledInputLabel>
            <StyledNumericFormat
                value={price}
                prefix={`${market === 'US' ? 'USD' : 'HKD'} $ `}
                suffix={` /${selectedCal === 'STOCK' ? "share" : "option"}`}
                placeholder={`${market === 'US' ? 'USD' : 'HKD'} $ 00.00 /${selectedCal === 'STOCK' ? "share" : "option"}`}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale
                onValueChange={(values) => handlePriceOnChange(values)}
            />
            <ErrorMessage {...errorMessageProps} />

        </Stack>
    )
}