import React, {useContext, useRef, useState} from 'react';
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLinkNotification,
    SLogo,
    SSearch,
    SSearchIcon,
    SSideBar, SSidebarButton, STheme, SThemeLabel, SThemeToggler, SToggleThumb
} from "./styles";
import Logo from '../../assets/GuacaGnoleLogo.png'
import {AiOutlineDashboard, AiOutlineLeft, AiOutlineSearch, AiOutlineSetting} from "react-icons/ai";
import {RiArticleLine, RiTruckLine} from "react-icons/ri";
import {MdLogout, MdSupportAgent} from "react-icons/md";
import {BsPeople} from "react-icons/bs";
import {ThemeContext} from "../../App";
import {useLocation} from "react-router-dom";


const SideBar = () => {
    const searchRef = useRef(null);
    const {theme, setTheme} = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {pathname} = useLocation();

    const searchClickHandler = () => {
        if(!sidebarOpen) {
            setSidebarOpen(true);
            searchRef.current.focus();
        } else {
            // searchRef.current.blur();

        }

    }
    return (
        <SSideBar isOpen={sidebarOpen} className={sidebarOpen ? "Open" : "Close"}>
            <>
                <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <AiOutlineLeft/>
                </SSidebarButton>
            </>
            <SLogo>
                <img src={Logo} alt={'logo'}/>
            </SLogo>
            <SSearch style={sidebarOpen ? {width: 'fit-content'} : {}} onClick={searchClickHandler}>
                <SSearchIcon>
                    <AiOutlineSearch/>
                </SSearchIcon>
                <input placeholder={"Search"} style={!sidebarOpen ? {width: 0, padding: 0} : {}}/>
            </SSearch>
            <SDivider/>
            {linksArray.map(({icon, label, notification, to}) => (
                <SLinkContainer key={label}>
                    <SLink to={to} style={!sidebarOpen ? {width: 'fit-content'} : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && (
                            <>
                                <SLinkLabel>{label}</SLinkLabel>
                                {!!notification &&
                                    <SLinkNotification>{notification}</SLinkNotification>
                                }
                            </>
                        )}
                    </SLink>
                </SLinkContainer>
            ))
            }
            <SDivider/>
            {secondLinksArray.map(({icon, label, notification, to}) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                    <SLink to={to} style={sidebarOpen ? {width: 'fit-content'} : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && (
                            <>
                                <SLinkLabel>{label}</SLinkLabel>
                                {!!notification &&
                                    <SLinkNotification>{notification}</SLinkNotification>
                                }
                            </>
                        )}
                    </SLink>
                </SLinkContainer>
            ))
            }
            <SDivider/>
            <STheme>
                {sidebarOpen &&
                <SThemeLabel>Dark mode</SThemeLabel> }
                <SThemeToggler isActive={theme === "dark"}
                               onClick={() => setTheme(p => p === 'light' ? "dark" : "light")}>
                    <SToggleThumb style={theme === "dark" ? {right: "1px"} : {}}/>
                </SThemeToggler>
            </STheme>
        </SSideBar>
    );
};
const linksArray = [
    {
        label: "DashBoard",
        icon: <AiOutlineDashboard/>,
        to: "/",
        notification: 0
    },
    {
        label: "Articles",
        icon: <RiArticleLine/>,
        to: "/Articles",
        notification: 0
    },
    {
        label: "Suppliers",
        icon: <RiTruckLine/>,
        to: "/Suppliers",
        notification: 0
    },
    {
        label: "Customers",
        icon: <BsPeople/>,
        to: "/Customers",
        notification: 0
    }, {
        label: "Support",
        icon: <MdSupportAgent/>,
        to: "/Support",
        notification: 3
    }
]

const secondLinksArray = [
    {
        label: "Settings",
        icon: <AiOutlineSetting/>,
        to: "/Settings",
        notification: 0
    }, {
        label: "Log out",
        icon: <MdLogout/>,
        to: "/LogOut",
        notification: 0
    }]
export default SideBar;