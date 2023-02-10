import React from 'react';
import SideBar from "../SideBar/SideBar";
import {Main, HeaderDodger} from "../../../Styles/Admin/AdminLayout/styles";
import ThemeAdmin from "../../../Styles/Admin/AdminLayout/themeAdmin";
import { ThemeProvider } from '@mui/material/styles';
import {CssBaseline} from "@mui/material";

const AdminLayout = ({children}) => {

    return (

        <ThemeProvider theme={ThemeAdmin()}>
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