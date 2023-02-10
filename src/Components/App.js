import '../Styles/App.css';
import PathRoutes from "../Utils/routes";
import {MainProvider} from "../Context/MainContext";

function App() {
    return (
        <MainProvider>
            <PathRoutes/>
        </MainProvider>
    );
}

export default App;
