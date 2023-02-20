import React, {useContext, useEffect} from "react";
import { Typography } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {MainContext} from "../../../Context/MainContext";
import { StyledAppBar, StyledButton, StyledToolbar, StyledTitle, StyledBoxTitle} from "../../../Styles/Customer/NavBar/NavBar";
import {AccountCircle} from "@mui/icons-material";

const navbarSize = 80;

const linksArray = [
    {
        label: "Home",
        link: "/"
    },
    {
        label: "Search",
        link: "/search"
    },
    {
        label: "Contact",
        link: "/contact"
    }
];

const Navbar = () => {
    const [scroll, setScroll] = React.useState(0);
    const { routeName, isAuth } = useContext(MainContext);
    const navigate = useNavigate();

    const isRoute = (route) => {
        return routeName === route;
    }

    const isScrolled = () => {
        if (isRoute("Home")) {
            const height = window.innerHeight * 0.6;
            if (scroll > height) {
                return true;
            }
        } else {
            if (scroll > navbarSize) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [setScroll, scroll]);

    return (
        <StyledAppBar position="fixed" scrolled={isScrolled()} height={navbarSize}>
            <StyledToolbar>
                <StyledTitle component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <StyledBoxTitle>
                            <img src="/assets/img/GuacaGnoleLogo.png" alt="logo" style={{ width: "auto", height: 60, marginRight:6 }} />
                            <Typography sx={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: isRoute("Home") ? (theme) => theme.palette.text.title : (theme) => theme.palette.text.primary,
                            }}>
                                GuacaGnole
                            </Typography>
                        </StyledBoxTitle>
                    </Link>
                </StyledTitle>
                {linksArray.map((link, index) => (
                    <StyledButton key={index} color="inherit" onClick={() => navigate(link.link)}>
                        <Typography sx={{
                            fontSize: 20,
                            fontWeight: 600,
                            color: isRoute("Home") ? (theme) => theme.palette.text.title : (theme) => theme.palette.text.primary,
                        }}>
                            {link.label}
                        </Typography>
                    </StyledButton>
                ))}
                <StyledButton color="inherit" onClick={() => isAuth() ? navigate("/session/account") : navigate("/session/signin")}>
                    <AccountCircle sx={{
                            fontSize: 30,
                            color: isRoute("Home") ? (theme) => theme.palette.text.title : (theme) => theme.palette.text.primary,
                        }}
                    />

                </StyledButton>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Navbar;