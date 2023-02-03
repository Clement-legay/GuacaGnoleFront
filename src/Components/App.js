import '../Styles/App.css';
import PathRoutes from "../Utils/routes";
import {createContext} from "react";
import { MainProvider } from "../Context/MainContext";

export const ThemeContext = createContext(null);

function App() {
    return (
        <MainProvider>
            <PathRoutes/>
        </MainProvider>
    );
}

export default App;
