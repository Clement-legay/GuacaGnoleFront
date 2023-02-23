import React, {useContext} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import {MainContext} from "../../../Context/MainContext";
import ThemeCustomer from "../../../Styles/Customer/CustomerLayout/themeCustomer";
import Navbar from "../NavBar/NavBar";
import {Main} from "../../../Styles/Customer/CustomerLayout/styles";

const CustomerLayout = ({children}) => {
    const { routeName } = useContext(MainContext);
    // const [finalTheme, setFinalTheme] = useState(null);

    // useEffect(() => {
    //     setFinalTheme(themeCustomer(theme, setTheme));
    // }, [theme, setTheme]);

    // return finalTheme === null ? (
    //     // loading screen
    //     <Box sx={{ width: '100%', height: '98vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //         <CircularProgress />
    //     </Box>
    // ) : (

    return (
        <ThemeProvider theme={ThemeCustomer()}>
            <CssBaseline />
            <Main ispath={routeName === "404" || routeName === 'Home' || routeName === "Search"}>
                <Navbar/>
                {children}
            </Main>
        </ThemeProvider>
    );
};

export default CustomerLayout;