import React, {useContext, useEffect, useState} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {CircularProgress, CssBaseline} from "@mui/material";
import {MainContext} from "../../../Context/MainContext";
import {Box} from "@mui/system";
import themeCustomer from "../../../Styles/Customer/CustomerLayout/themeCustomer";

const CustomerLayout = ({children}) => {
    const { theme, setTheme } = useContext(MainContext);
    const [finalTheme, setFinalTheme] = useState(null);

    useEffect(() => {
        setFinalTheme(themeCustomer(theme, setTheme));
    }, [theme, setTheme]);

    return finalTheme === null ? (
        // loading screen
        <Box sx={{ width: '100%', height: '98vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Box>
    ) : (
        <ThemeProvider theme={finalTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    );
};

export default CustomerLayout;