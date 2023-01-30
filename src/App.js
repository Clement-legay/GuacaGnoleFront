import './App.css';
import {Route, Routes} from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";


function App() {
    return (
        <Routes>
            <Route path="/" element={<DashBoard/>}/>
        </Routes>
    );
}

export default App;
