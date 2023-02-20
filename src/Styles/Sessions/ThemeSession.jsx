import {createTheme} from "@mui/material/styles";

export const SessionTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#E91E63',
        },
        secondary: {
            main: '#9C27B0',
        },
        warning: {
            main: '#f8c02b',
        },
        error: {
            main: '#f81537',
        },
        success: {
            main: '#18fa7a',
        },
        background: {
            default: '#ffffff',
            paper: '#272727',
        },
        text: {
            primary: '#ffffff',
            secondary: '#c7c6c6',
            altPrimary: '#85b0ff',
        }
    }
});