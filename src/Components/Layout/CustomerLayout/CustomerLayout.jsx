import React, {useContext} from 'react';
import {ThemeProvider} from "styled-components";
import { lightTheme, darkTheme } from "../../../Styles/Layout/CustomerLayout/themeCustomer";
import { MainContext } from "../../../Context/MainContext";


const CustomerLayout = ({children}) => {
    const context = useContext(MainContext);
    const themeStyle = context.isDark === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={themeStyle}>
            <div>{children}</div>
        </ThemeProvider>
    );
};

export default CustomerLayout;