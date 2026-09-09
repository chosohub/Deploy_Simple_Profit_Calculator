import {createTheme} from '@mui/material/styles';

// Extend MUI theme types for custom palette keys
declare module '@mui/material/styles' {
    interface Palette {
        stock: Palette['primary'];
        option: Palette['primary'];
    }

    interface PaletteOptions {
        stock?: PaletteOptions['primary'];
        option?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        stock: true;
        option: true;
    }
}

export const customTheme = createTheme({
    palette: {
        stock: {
            main: '#1E3A8A',
            light: '#EEF2FF',
            contrastText: '#FFFFFF',
        },
        option: {
            main: '#7E22CE',
            light: '#F3E8FF',
            contrastText: '#FFFFFF',
        },
    },
});