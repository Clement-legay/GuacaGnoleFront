import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {StyledBoxTitle} from "../../../../Styles/Customer/NavBar/NavBar";
import LockIcon from "@mui/icons-material/Lock";
import React from "react";

const NavBar = ({cartSize}) => {
    return (
        <AppBar position="static">
            <Toolbar sx={{
                backgroundColor: "#2E3B55",
                color: "white",
            }}>
                <Grid container spacing={2} alignItems={"center"} justifyContent={"space-evenly"} sx={{px:10, py:1}}>
                    <Grid item>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <StyledBoxTitle>
                                <img src="/assets/img/GuacaGnoleLogo.png" alt="logo" style={{ width: "auto", height: 60, marginRight:6 }} />
                                <Typography sx={{
                                    fontSize: 20,
                                    fontWeight: 400,
                                    color: "white",
                                }}>
                                    GuacaGnole
                                </Typography>
                            </StyledBoxTitle>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Typography variant={"h6"}>To order ({cartSize()} article{cartSize() > 1 ? "s" : ""})</Typography>
                    </Grid>
                    <Grid item>
                        <LockIcon/>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;