import React from 'react';
import {ThemeProvider} from "@mui/material/styles";
import themeCustomer from "../../../Styles/Customer/CustomerLayout/themeCustomer";


const CustomerLayout = ({children}) => {


    return (
        <ThemeProvider theme={themeCustomer()}>
            {children}
        </ThemeProvider>
    );
};

export default CustomerLayout;