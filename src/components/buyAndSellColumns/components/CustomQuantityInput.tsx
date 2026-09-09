import {Stack} from "@mui/material";
import {StyledInputLabel, StyledNumericFormat} from "../../styledComponents/styledComponents.ts";
import ErrorMessage, {type ErrorMessageProps} from "./ErrorMessage.tsx";
import type {NumberFormatValues} from "react-number-format";

type CustomQuantityInputProps = {
    quantity: number | '';
    handleQuantityOnChange: (values: NumberFormatValues) => void;
    errorMessageProps: ErrorMessageProps
}

export default function CustomQuantityInput({
                                                quantity,
                                                handleQuantityOnChange,
                                                errorMessageProps
                                            }: CustomQuantityInputProps) {
    return (
        <Stack spacing={0.5}>
            <StyledInputLabel variant={'caption'}>Quantity</StyledInputLabel>
            <StyledNumericFormat
                value={quantity}
                placeholder={"0.00"}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale
                onValueChange={(e)=>handleQuantityOnChange(e)}
            />
            <ErrorMessage {...errorMessageProps} />

        </Stack>

    )
}