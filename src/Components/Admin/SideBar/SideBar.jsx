import React, {useContext, useState} from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate } from "react-router-dom";
import {styled} from "@mui/material/styles";
import MuiDrawer from '@mui/material/Drawer';
import {MainContext} from "../../../Context/MainContext";
import {Grid, Switch, Typography} from "@mui/material";
import {DarkMode} from "@mui/icons-material";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const linksArray = [
    {
        label: "DashBoard",
        icon: <SpeedOutlinedIcon/>,
        to: "/admin/dashboard",
        notification: 0
    },
    {
        label: "Articles",
        icon: <ArticleOutlinedIcon/>,
        to: "/admin/articles",
        notification: 0
    },
    {
        label: "Suppliers",
        icon: <LocalShippingOutlinedIcon/>,
        to: "/admin/suppliers",
        notification: 0
    },
    {
        label: "Customers",
        icon: <PeopleAltOutlinedIcon/>,
        to: "/admin/customers",
        notification: 0
    }, {
        label: "Support",
        icon: <SupportAgentOutlinedIcon/>,
        to: "/admin/Support",
        notification: 3
    }
]

const secondLinksArray = [
    {
        label: "Settings",
        icon: <SettingsOutlinedIcon/>,
        to: "/admin/Settings",
        notification: 0
    }, {
        label: "Log out",
        icon: <LogoutOutlinedIcon/>,
        to: "/",
        notification: 0
    }]



const SideBar = () => {
    const navigate = useNavigate();
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const {theme, setTheme} = useContext(MainContext);


    const handleDrawerOpen = () => {
        setSideBarOpen(true);
    };

    const handleDrawerClose = () => {
        setSideBarOpen(false);
    };
    return (
        <Drawer variant="permanent" open={sideBarOpen}>
            <DrawerHeader>
                {/*{logo centered in drawer header}*/}
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                        <img src={"/assets/img/GuacaGnoleLogo.png"} alt="logo" style={{maxWidth: "100%", height: "75px"}} loading="lazy"/>
                    </Grid>
                </Grid>



                <IconButton style={{position: "absolute"}} onClick={() => sideBarOpen ? handleDrawerClose() : handleDrawerOpen()}>
                    {sideBarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {linksArray.map((item, index) => (
                    <ListItemButton key={item.label} sx={{
                        minHeight: "50px",
                    }} onClick={
                        () => {
                            navigate(item.to);
                        }
                    }>
                        <ListItemIcon color={"primary"}>{item.icon}</ListItemIcon>
                        <ListItemText color={"primary"} primary={item.label} />
                    </ListItemButton>
                ))}
            </List>
            <Divider />
            <List>
                {secondLinksArray.map((item, index) => (
                    <ListItemButton key={item.label} sx={{
                        minHeight: "50px",
                    }} onClick={
                        () => {
                            navigate(item.to);
                        }
                    }>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>
            <Divider />
            <Grid container justifyContent="center" alignItems="center" sx={{my: 2}}>
                <Grid item>
                    <Switch size={"small"} checkedIcon={<DarkMode/>} sx={{my: 2, mx: 1}} color={"primary"} value={theme === "dark"} onChange={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={"Dark theme"}/>
                </Grid>
                <Grid item>
                    <Typography variant={"caption"}>Dark theme</Typography>
                </Grid>
            </Grid>

        </Drawer>
    );
};

export default SideBar;