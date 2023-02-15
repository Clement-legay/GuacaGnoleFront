import React, {useContext, useEffect, useState} from 'react';
import SideBar from "../SideBar/SideBar";
import {Main, HeaderDodger} from "../../../Styles/Admin/AdminLayout/styles";
import { ThemeProvider } from '@mui/material/styles';
import {CircularProgress, CssBaseline} from "@mui/material";
import {MainContext} from "../../../Context/MainContext";
import {Box} from "@mui/system";
import themeAdmin from "../../../Styles/Admin/AdminLayout/themeAdmin";

const AdminLayout = ({children}) => {
    const { theme, setTheme } = useContext(MainContext);
    const [finalTheme, setFinalTheme] = useState(null);

    useEffect(() => {
        setFinalTheme(themeAdmin(theme, setTheme));
    }, [theme, setTheme]);

    return finalTheme === null ? (
        // loading screen
        <Box sx={{ width: '100%', height: '98vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Box>
    ) : (

        <ThemeProvider theme={finalTheme}>
            <Main>
                <CssBaseline/>
                <SideBar/>
                <HeaderDodger>
                    {children}
                </HeaderDodger>
            </Main>
        </ThemeProvider>
    );
};

export default AdminLayout;