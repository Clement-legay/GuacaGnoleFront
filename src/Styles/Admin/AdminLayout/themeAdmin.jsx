import { createTheme } from "@mui/material/styles";
import {useContext} from "react";
import {MainContext} from "../../../Context/MainContext";
import Cookies from 'js-cookie';

const getTheme = (mode) => ({
    palette: mode === "dark" ? {
        mode: 'dark',
        primary: {
            main: '#367af8',
        },
        secondary: {
            main: '#8539fd',
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
            default: '#1e1e1e',
            paper: '#272727',
        },
        text: {
            primary: '#ffffff',
            secondary: '#c7c6c6',
            altPrimary: '#85b0ff',
        }
    } : {

        mode: 'light',
        primary: {
            main: '#3a86ff',
        },
        secondary: {
            main: '#8338ec',
        },
        warning: {
            main: '#ffbe0b',
        },
        error: {
            main: '#ff006e',
        },
        success: {
            main: '#06d6a0',
        },
        background: {
            default: '#f4f6f8',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e1e1e',
            secondary: '#272727',
            altPrimary: '#0e1f3b',
        }
    }

});

const ThemeAdmin = (theme, setTheme) => {

    if (theme === null) {
        if (Cookies.get('theme') === 'dark') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }
    Cookies.set('theme', theme);

    return createTheme({
        ...getTheme(theme),
        overrides: {
            // change color of the body tag in the admin layout
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: theme === "dark" ? "#1e1e1e" : "#f4f6f8",
                    }
                }
            }


        }
    });
};

export default ThemeAdmin;