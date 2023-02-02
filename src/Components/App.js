import '../Styles/App.css';
import {Route, Routes} from "react-router-dom";
import DashBoard from "./DashBoard/DashBoard";
import {createContext, useState} from "react";
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "../Styles/Layout/gobalStyles";
import {darkTheme, lightTheme} from "../Styles/Layout/theme";
import DefaultLayout from "./Layout/DefaultLayout";

export const ThemeContext = createContext(null);

function App() {
    const [theme, setTheme] = useState('light');
    const themeStyle = theme === 'light' ? lightTheme : darkTheme;
    return (
        <ThemeContext.Provider value={{setTheme, theme}}>
            <ThemeProvider theme={themeStyle}>
                <GlobalStyles/>
                <DefaultLayout>
                    <Routes>
                        <Route path="/" element={<DashBoard/>}/>
                    </Routes>
                </DefaultLayout>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default App;
