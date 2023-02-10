import React from 'react';
import {SessionTheme} from "../../Styles/Sessions/ThemeSession";
import { ThemeProvider } from '@mui/material/styles';
import {CssBaseline} from "@mui/material";

const SessionLayout = ({children}) => {

    return (

        <ThemeProvider theme={SessionTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    );
};

export default SessionLayout;