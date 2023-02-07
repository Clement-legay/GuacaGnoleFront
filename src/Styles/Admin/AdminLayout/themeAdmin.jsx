import { createTheme } from "@mui/material/styles";
import {useContext} from "react";
import {MainContext} from "../../../Context/MainContext";

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
            secondary: '#ffffff',
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
        }
    }

});

const ThemeAdmin = () => {
    const { theme } = useContext(MainContext);


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