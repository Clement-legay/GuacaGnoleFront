import './assets/css/App.css';
import {Route, Routes} from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import {createContext, useState} from "react";
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./Components/Layout/gobalStyles";
import {darkTheme, lightTheme} from "./Components/Layout/theme";
import DefaultLayout from "./Components/Layout/DefaultLayout";

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
