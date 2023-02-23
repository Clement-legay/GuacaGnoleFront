import React, {useContext, useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {MainContext} from "../../../Context/MainContext";
import { StyledAppBar, StyledButton, StyledToolbar, StyledTitle, StyledBoxTitle} from "../../../Styles/Customer/NavBar/NavBar";
import {ShoppingCart} from "@mui/icons-material";
import BasicMenu from "./Component/ProfileMenu";

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
    const [scroll, setScroll] = useState(0);
    const { routeName, isAuth, logUserOut } = useContext(MainContext);
    const [isRoute, setIsRoute] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsRoute(["Home", "Search"].includes(routeName));
    }, [setIsRoute, routeName]);

    useEffect(() => {
        if (isRoute) {
            const height = window.innerHeight * 0.6;
            if (scroll > height) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        } else {
            if (scroll > navbarSize) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }
    }, [scroll, isRoute]);

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
        <StyledAppBar position="fixed" scrolled={isScrolled} height={navbarSize}>
            <StyledToolbar>
                <StyledTitle component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <StyledBoxTitle>
                            <img src="/assets/img/GuacaGnoleLogo.png" alt="logo" style={{ width: "auto", height: 60, marginRight:6 }} />
                            <Typography sx={{
                                fontSize: 20,
                                fontWeight: 400,
                                color: isRoute ? (theme) => theme.palette.text.title : (theme) => theme.palette.text.primary,
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
                            fontWeight: 400,
                            color: isRoute ? (theme) => theme.palette.text.title : (theme) => theme.palette.text.primary,
                        }}>
                            {link.label}
                        </Typography>
                    </StyledButton>
                ))}
                <BasicMenu isAuth={isAuth} logUserOut={logUserOut} navigate={navigate} />
                {isAuth() && (
                    <StyledButton color="inherit" onClick={() => navigate("/session/cart")}>
                        <ShoppingCart sx={{
                            fontSize: 30,
                            color: isRoute ? (theme) => theme.palette.text.title : (theme) => theme.palette.text.primary,
                        }}/>
                    </StyledButton>
                )}
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Navbar;