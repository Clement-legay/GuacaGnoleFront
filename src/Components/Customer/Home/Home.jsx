import {Fragment, useContext} from "react";
import {MainContext} from "../../../Context/MainContext";
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";

const Home = () => {
    const { user, token, role, logUserOut } = useContext(MainContext)

    return (
        <Fragment>
            <h1>Home</h1>
            <p>Token: {token}</p>
            <p>User: {user}</p>
            <p>Role: {role}</p>
            <Button variant="contained" component={NavLink} to="/session/signin">Login</Button>
            <Button variant="contained" onClick={() => {
                logUserOut()
            }}>Logout</Button>
            <Button variant="contained" component={NavLink} to="/admin/">Admin</Button>
        </Fragment>
    )
};

export default Home;
