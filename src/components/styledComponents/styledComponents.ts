import {
    Button,
    type ButtonProps, MenuItem,
    Paper,
    type PaperProps, Select, type SelectProps,
    styled,
    Typography,
    type TypographyProps
} from "@mui/material";
import {NumericFormat, type NumericFormatProps} from "react-number-format";

export const StyledCalSelectionButton = styled(Button)<ButtonProps>({
    minWidth: 120,
    borderRadius: 4,
    fontWeight: 600,
    fontFamily: 'monospace'
})

export const StyledSelect = styled(Select)<SelectProps>(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 1,
    fontFamily: 'monospace'
}))

export const StyledMenuItem = styled(MenuItem)({
    fontFamily:'monospace'
})

export const StyledInputLabel = styled(Typography)<TypographyProps>(({theme}) => ({
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: 600,
    whiteSpace: 'nowrap'
}));

export const StyledNumericFormat = styled(NumericFormat)<NumericFormatProps>({
    padding: '7px',
    letterSpacing: 0.5,
    fontWeight: 500,
    fontFamily: 'monospace'
})

export const StyledBuySellColumn = styled(Paper)<PaperProps>(({theme}) => ({
    flex: 1,
    padding: theme.spacing(2),
    borderRadius: 8,
    border: '1px solid',
    borderColor: theme.palette.divider,
    position: 'relative',
}))