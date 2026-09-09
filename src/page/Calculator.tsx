import * as React from "react";
import {useMemo, useState} from 'react';
import type {NumberFormatValues} from "react-number-format";
import {
    Box,
    Button, Checkbox,
    FormControlLabel,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {customTheme} from "../customTheme";
import {
    type Platform,
    platforms,
    type Market,
    markets
} from "../components/constants/formSelectionsConstants.ts";
import {type CalFormData, getDefaultFormData} from "../components/constants/formDataInterfaces.ts";
import {
    StyledInputLabel, StyledCalSelectionButton, StyledSelect, StyledMenuItem
} from "../components/styledComponents/styledComponents.ts";
import {profitAndLossCalculation} from "../helperFunc/platform/profitAndLossCalculation.ts";
import {roundToTwoDecimals} from "../helperFunc/roundingFunc.ts";
import CustomFormControl from "../components/buyAndSellColumns/components/CustomFormControl.tsx";
import {CustomColumn} from "../components/buyAndSellColumns/customColumn.tsx";
import {validateFormData} from "../helperFunc/validateFormData.ts";
import {sumOfBuyQuantity} from "../helperFunc/sumOfBuyQuantity.ts";
import Disclaimer from "../components/buyAndSellColumns/components/Disclaimer.tsx";
import GithubLink from "../components/GithubLink/GithubLink.tsx";


export default function Calculator() {

    const [calFormData, setCalFormData] = useState<CalFormData>(getDefaultFormData())
    const [result, setResult] = useState<number | undefined>(undefined)
    const [isCalculateClicked, setIsCalculateClicked] = useState<boolean>(false)

    // Calculated automatically whenever calFormData changes
    const errors = useMemo(() => {
        return validateFormData(isCalculateClicked, calFormData)
    }, [calFormData, isCalculateClicked]);


    const resetFields = () => {
        setIsCalculateClicked(false)
        setCalFormData(getDefaultFormData())
    }

    const handleOnSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        setIsCalculateClicked(true)

        const currErrors = validateFormData(true, calFormData)

        if (Object.keys(currErrors).length > 0) {
            return;
        }

        setResult(roundToTwoDecimals(profitAndLossCalculation(calFormData)))
    }


    const handleBuyQuantityOnChange = (values: NumberFormatValues, columnId: string) => {
        setCalFormData(p => {

            const nextBuyColumnList = p.buyColumnList.map((value) => {
                if (value.id === columnId) {
                    value.buyQuantity = values.floatValue ?? ""
                    return value
                }
                return value
            })

            const newSellQuantity = sumOfBuyQuantity(nextBuyColumnList);

            return {
                ...p,
                buyColumnList: nextBuyColumnList,
                sellQuantity: newSellQuantity
            };
        })

    }

    const handleBuyPriceOnChange = (values: NumberFormatValues, columnId: string) => {
        setCalFormData(p => ({
            ...p,
            buyColumnList: p.buyColumnList.map((value) => {
                if (value.id === columnId) {
                    value.buyPrice = values.floatValue ?? ""
                    return value
                }
                return value
            })
        }))
    }

    const handleSellQuantityOnChange = (values: NumberFormatValues,) => {
        setCalFormData(p => ({
            ...p, sellQuantity: values.floatValue ?? "",
        }))
    }

    const handleSellPriceOnChange = (values: NumberFormatValues) => {
        setCalFormData(p => ({
            ...p, sellPrice: values.floatValue ?? "",
        }))
    }

    const handleCancelOnClick = (columnId: string) => {
        setCalFormData(p => {
            const updatedBuyColumnList = p.buyColumnList.filter(value => value.id !== columnId)
            const newSellQuantity = sumOfBuyQuantity(updatedBuyColumnList);

            return {
                ...p,
                buyColumnList: updatedBuyColumnList,
                sellQuantity: newSellQuantity
            }
        })
    }


    return (
        <ThemeProvider theme={customTheme}>
            <Box
                sx={{
                    maxWidth: 600,
                    mx: 'auto',
                    my: 6,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                }}
            >
                {/* Header */}
                <Typography variant="h4"
                            component="h1"
                            sx={{
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                whiteSpace: 'nowrap',
                                fontWeight: 500,
                                fontFamily: 'monospace'
                            }}>
                    Transaction Profit Calculator
                </Typography>

                {/* Asset Toggle Buttons */}
                <Stack direction="row" spacing={2}>
                    <StyledCalSelectionButton
                        variant={calFormData.selectedCal === 'STOCK' ? 'contained' : 'outlined'}
                        color="stock"
                        onClick={() => {
                            setCalFormData((p) => ({...p, selectedCal: 'STOCK'}))
                        }}
                    >
                        Stock
                    </StyledCalSelectionButton>
                    <StyledCalSelectionButton
                        variant={calFormData.selectedCal === 'OPTION' ? 'contained' : 'outlined'}
                        color="option"
                        onClick={() => setCalFormData((p) => ({...p, selectedCal: 'OPTION'}))}
                    >
                        Option
                    </StyledCalSelectionButton>
                </Stack>

                {/* Form Card Container */}
                <Paper
                    component="form"
                    elevation={0}
                    onReset={resetFields}
                    onSubmit={(e) => {
                        handleOnSubmit(e);
                    }}
                    sx={{
                        width: '100%',
                        p: 4,
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        backgroundColor:
                            calFormData.selectedCal === 'STOCK' ? 'stock.light' : 'option.light',
                        border: '1px solid',
                        borderColor:
                            calFormData.selectedCal === 'STOCK' ? 'stock.main' : 'option.main',
                        transition: 'all 0.2s ease-in-out',
                    }}
                >
                    {/* Platform Select */}
                    <CustomFormControl>
                        <StyledInputLabel variant={'caption'} id="platform-select-label">
                            Trading Platform
                        </StyledInputLabel>
                        <StyledSelect
                            labelId="platform-select-label"
                            value={calFormData.platform}
                            onChange={(e) =>
                                setCalFormData((p) => ({
                                    ...p,
                                    platform: e.target.value as Platform,
                                }))
                            }
                        >
                            {platforms.map((platform) => (
                                <StyledMenuItem value={platform} key={platform}>
                                    {platform}
                                </StyledMenuItem>
                            ))}
                        </StyledSelect>
                    </CustomFormControl>
                    <CustomFormControl>
                        <StyledInputLabel variant={'caption'} id="market-select-label">
                            Trading market
                        </StyledInputLabel>
                        <StyledSelect
                            labelId="market-select-label"
                            value={calFormData.market}
                            onChange={(e) =>
                                setCalFormData((p) => ({
                                    ...p,
                                    market: e.target.value as Market,
                                }))
                            }
                        >
                            {
                                markets.map((market) => (
                                    <StyledMenuItem value={market} key={market}>
                                        {market}
                                    </StyledMenuItem>
                                ))
                            }

                        </StyledSelect>

                    </CustomFormControl>

                    {/* Buy & Sell Side-by-Side Sections */}
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <Stack direction="column" spacing={2} sx={{flex: 1}}>
                            {
                                calFormData.buyColumnList.map((value, index) => {
                                    return <CustomColumn key={value.id}
                                                         columnId={value.id}
                                                         calFormData={calFormData}
                                                         handlePriceOnChange={(e) => handleBuyPriceOnChange(e, value.id)}
                                                         handleQuantityOnChange={(e) => handleBuyQuantityOnChange(e, value.id)}
                                                         errors={errors}
                                                         buyOrSell={'BUY'} quantity={value.buyQuantity}
                                                         price={value.buyPrice}
                                                         canCancel={index > 0}
                                                         handleCancelOnClick={handleCancelOnClick}
                                    />
                                })
                            }
                            <Button sx={{border: '1px dashed '}} onClick={() => {
                                setCalFormData((p) => ({
                                    ...p,
                                    buyColumnList: [...p.buyColumnList, {
                                        id: crypto.randomUUID(),
                                        buyQuantity: "",
                                        buyPrice: ""
                                    }]
                                }))
                            }}>
                                Add new quantity
                            </Button>
                        </Stack>

                        {/* SELL Column */}

                        <CustomColumn
                            columnId={crypto.randomUUID()}
                            calFormData={calFormData}
                            handlePriceOnChange={handleSellPriceOnChange}
                            handleQuantityOnChange={handleSellQuantityOnChange}
                            errors={errors}
                            buyOrSell={'SELL'} quantity={calFormData.sellQuantity}
                            price={calFormData.sellPrice}
                        />

                    </Stack>


                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={calFormData.isCommissionFree}
                                onChange={(e) => setCalFormData((p) => ({...p, isCommissionFree: e.target.checked}))}
                            />
                        } label="Commission-free?"
                        slotProps={{
                            typography: {
                                variant: 'caption',
                                sx: {
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                }
                            }
                        }}
                    />

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={2} sx={{justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Button
                            type="reset"
                            variant="outlined"
                            color="inherit"
                            sx={{
                                px: 3,
                                borderRadius: 2,
                                letterSpacing: 1,
                                textTransform: 'uppercase',
                                fontFamily: 'monospace'
                            }}
                            fullWidth
                            onClick={() => {
                                setResult(undefined)
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            disabled={Object.keys(errors).length > 0}
                            variant="contained"
                            color={calFormData.selectedCal === 'STOCK' ? 'stock' : 'option'}
                            sx={{
                                px: 4,
                                borderRadius: 2,
                                fontWeight: 600,
                                letterSpacing: 1,
                                textTransform: 'uppercase',
                                fontFamily: 'monospace'
                            }}
                            fullWidth
                        >
                            Calculate
                        </Button>
                    </Stack>
                </Paper>

                {/* Profit/Loss Result Output */}
                <Paper
                    elevation={0}
                    sx={{
                        width: '100%',
                        p: 3,
                        textAlign: 'center',
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <StyledInputLabel variant="body2">
                        Estimated Profit / Loss
                    </StyledInputLabel>
                    <Typography variant="h3"
                                sx={{
                                    color: result && result > 0 ? 'darkgreen' : result && result < 0 ? 'darkred' : 'gray',
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5,
                                    fontWeight: 600,
                                    whiteSpace: 'nowrap',
                                    fontFamily: 'monospace'
                                }}>
                        {`${result && result < 0 ? '-' : ''}${calFormData.market === 'US' ? 'USD' : 'HKD'}$${result ? Math.abs(result) : '0.00'}`}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{mt: 0.5,}}>
                        *Note: Final fees are rounded to 2 decimal places. Actual brokerage charges may vary slightly
                        due to regulatory exchange rounding rules.
                    </Typography>
                </Paper>

                <Disclaimer/>
                <GithubLink/>
            </Box>
        </ThemeProvider>
    );
};