import {Box, FormHelperText} from "@mui/material";

export type ErrorMessageProps = {
    hasError: boolean;
    errorMessage: string;
}


export default function ErrorMessage({hasError, errorMessage}: ErrorMessageProps) {
    return (
        <Box sx={{minHeight: '20px', mt: 0.5}}>
            <FormHelperText error={hasError} sx={{my: 0, color: 'error.main'}}>
                {errorMessage}
            </FormHelperText>
        </Box>
    )
}