import {IconButton, Stack, Typography} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import {StyledBuySellColumn} from "../styledComponents/styledComponents.ts";
import CustomQuantityInput from "./components/CustomQuantityInput.tsx";
import CustomPriceInput from "./components/CustomPriceInput.tsx";
import type {NumberFormatValues} from "react-number-format";
import type {CalFormData, FormErrors} from "../constants/formDataInterfaces.ts";


type CustomColumnProps = {
    calFormData: CalFormData
    handlePriceOnChange: (values: NumberFormatValues) => void
    handleQuantityOnChange: (values: NumberFormatValues) => void
    errors: FormErrors
    buyOrSell: 'BUY' | 'SELL'
    quantity: number | ''
    price: number | ''
    canCancel?: boolean
    handleCancelOnClick?: (columnId: string) => void
    columnId: string
}

export const CustomColumn = ({
                                 calFormData,
                                 errors,
                                 handleQuantityOnChange,
                                 handlePriceOnChange,
                                 buyOrSell,
                                 quantity,
                                 price,
                                 canCancel = true,
                                 handleCancelOnClick,
                                 columnId
                             }: CustomColumnProps) => {
    return (
        <StyledBuySellColumn
            elevation={0}
            sx={{
                backgroundColor: buyOrSell === 'BUY' ? '#DCFCE7' : '#FEE2E2',
            }}
        >

            {
                buyOrSell === 'BUY' && canCancel && handleCancelOnClick &&
              <IconButton
                disabled={!canCancel}
                onClick={() => handleCancelOnClick(columnId)}
                size="small"
                sx={{position: 'absolute', top: 8, right: 8}}
              >
                <CancelIcon/>
              </IconButton>
            }

            <Typography
                variant="subtitle2"
                color={buyOrSell === 'BUY' ? "success" : "error"}
                sx={{
                    display: 'flex',
                    justifySelf: 'center',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: 1,
                }}
            >
                {buyOrSell}
            </Typography>
            <Stack spacing={1}>
                <CustomQuantityInput
                    quantity={quantity}
                    handleQuantityOnChange={handleQuantityOnChange}
                    errorMessageProps={({
                        hasError: Boolean(buyOrSell === 'BUY' ? errors.buyQuantity?.includes(columnId) : errors.sellQuantity),
                        errorMessage: buyOrSell === 'BUY' ? getErrorMessage(errors.buyQuantity, columnId, buyOrSell, "Q") : (errors.sellQuantity || '')
                    })}
                />

                <CustomPriceInput
                    selectedCal={calFormData.selectedCal}
                    price={price}
                    market={calFormData.market}
                    handlePriceOnChange={handlePriceOnChange}
                    errorMessageProps={({
                        hasError: Boolean(buyOrSell === 'BUY' ? errors.buyPrice : errors.sellPrice),
                        errorMessage: buyOrSell === 'BUY' ? getErrorMessage(errors.buyPrice, columnId, buyOrSell, "P") : (errors.sellPrice || '')
                    })}
                />
            </Stack>
        </StyledBuySellColumn>
    )
}

const getErrorMessage = (array: string[] | undefined, columnId: string, buyOrSell: 'BUY' | 'SELL', quantityOrPrice: 'P' | 'Q') => {
    if (!array) return ''
    return array.includes(columnId) ? `Enter a valid ${buyOrSell === 'BUY' ? 'buy ' : 'sell '} ${quantityOrPrice === 'Q' ? 'quantity' : 'price'}` : ''
}