import React, {useContext} from 'react';
import SideBar from "../SideBar/SideBar";
import {SLayout, SMain} from "../../../Styles/Admin/AdminLayout/styles";
import {GlobalStyles} from "../../../Styles/Admin/AdminLayout/gobalStyles";
import {lightTheme, darkTheme} from "../../../Styles/Admin/AdminLayout/themeAdmin";
import {ThemeProvider} from "styled-components";
import {MainContext} from "../../../Context/MainContext";



const AdminLayout = ({children}) => {
    const context = useContext(MainContext);
    const themeStyle = context.theme === 'light' ? lightTheme : darkTheme;

    return (

            <ThemeProvider theme={themeStyle}>
                <GlobalStyles/>
                <SLayout>
                    <SideBar/>
                    <SMain>{children}</SMain>
                </SLayout>
            </ThemeProvider>
    );
};

export default AdminLayout;