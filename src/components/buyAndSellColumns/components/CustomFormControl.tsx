import * as React from "react";
import {FormControl} from "@mui/material";

type CustomFormControlProps = {
    children: React.ReactNode;
    props?: React.ComponentProps<typeof FormControl>;
}
export default function CustomFormControl({children, props}: CustomFormControlProps) {
    return (
        <FormControl fullWidth size="small" {...props}>
            {children}
        </FormControl>
    )
}