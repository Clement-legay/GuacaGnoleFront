import React, {useContext, useEffect, useState} from 'react';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import LiquorIcon from '@mui/icons-material/Liquor';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useNavigate } from "react-router-dom";
import {styled} from "@mui/material/styles";
import MuiDrawer from '@mui/material/Drawer';
import {MainContext} from "../../../Context/MainContext";
import {AppBar, Autocomplete, Avatar, CssBaseline, Grid, Switch, TextField, Toolbar, Typography} from "@mui/material";
import {Box} from "@mui/system";
import Cookies from "js-cookie";
import {SearchOutlined} from "@mui/icons-material";
import ReceiptIcon from '@mui/icons-material/Receipt';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const drawerWidth = 240;
const drawerClosedWidth = 90;
const headerHeight = 82;

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
    width: drawerClosedWidth
});

const headerMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
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
// use two props to open/close and scrolly
const Header = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        ...headerMixin(theme),
        height: headerHeight,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
        }),
        ...(!open && {
            width: `calc(100% - ${drawerClosedWidth}px)`,
        }),
    }),
);

const linksArray = [
    {
        label: "DashBoard",
        icon: <SpeedOutlinedIcon/>,
        to: "/admin/",
        notification: 0
    },
    {
        label: "Products",
        icon: <LiquorIcon/>,
        to: "/admin/products",
        notification: 0
    },
    {
        label: "Invoices",
        icon: <ReceiptIcon/>,
        to: "/admin/invoices",
        notification: 0
    },
    {
        label: "Offers",
        icon: <LocalOfferIcon/>,
        to: "/admin/offers",
        notification: 0
    },
    {
        label: "Suppliers",
        icon: <LocalShippingOutlinedIcon/>,
        to: "/admin/suppliers",
        notification: 0
    },
    {
        label: "Users",
        icon: <PeopleAltOutlinedIcon/>,
        to: "/admin/users",
        notification: 0
    },

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
    const [sideBarOpen, setSideBarOpen] = useState(Cookies.get('drawerOpen') ? Cookies.get('drawerOpen') === 'true' : true);
    const {theme, setTheme, routeName} = useContext(MainContext);
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [setScroll, scroll]);

    const handleDrawerOpen = () => {
        setSideBarOpen(true);
        Cookies.set('drawerOpen', true);
    };

    const handleDrawerClose = () => {
        setSideBarOpen(false);
        Cookies.set('drawerOpen', false);
    };

    const handleThemeChange = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <Header open={sideBarOpen} variant="permanent" component="nav" color={scroll > headerHeight / 3 ? "background" : "transparent"}>
                <Toolbar sx={{height:"100%"}}>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{px: 4}}>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography variant="h6" noWrap component="div" sx={{color: `${(theme) => theme.palette.text.primary}`, fontWeight: "bold"}}>
                                        {routeName}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Autocomplete
                                        sx={{width: 300, ml:4, mb: 1}}
                                        freeSolo
                                        id="free-solo-2-demo"
                                        //groupBy={(option) => option.title[0]}
                                        disableClearable
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={
                                                <Box sx={{display: "flex", alignItems: "center"}}>
                                                    <SearchOutlined sx={{mr: 1}}/>
                                                    Search
                                                </Box>
                                                }
                                                margin="normal"
                                                InputProps={{...params.InputProps, type: 'search'}}
                                            />
                                        )}
                                        options={WAITING.map((option) => option.title)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Switch
                                        checked={theme === "dark"}  // if theme is dark then checked is true
                                        onChange={handleThemeChange}
                                        color={theme === "dark" ? "primary" : "default"}
                                        sx={{mx: 2}}
                                    />
                                </Grid>
                                <Grid item>
                                    <Avatar sx={{ml: 2}}/>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                </Toolbar>
            </Header>
            <Drawer variant="permanent" open={sideBarOpen}>
                <DrawerHeader>
                    {/*{logo centered in drawer header}*/}
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <img src={"/assets/img/GuacaGnoleLogo.png"} alt="logo" style={{maxWidth: "100%", height: "60px"}} loading="lazy"/>
                        </Grid>
                    </Grid>



                    <IconButton style={{position: "absolute"}} onClick={() => sideBarOpen ? handleDrawerClose() : handleDrawerOpen()}>
                        {sideBarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <List>
                    {linksArray.map((item, index) => (
                        <ListItemButton disabled={routeName === item.label} key={item.label} sx={{
                            minHeight: "70px",
                            px: 4.2,
                            position: "relative",
                            ...(routeName === item.label && {
                                opacity: 1,
                                '&:after': {
                                    content: '""',
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    right: 0,
                                    width: "5px",
                                    height: "75%",
                                    backgroundColor: (theme) => theme.palette.text.primary,
                                    borderRadius: "5px",
                                }


                            })
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

                <List>
                    {secondLinksArray.map((item, index) => (
                        <ListItemButton key={item.label} sx={{
                            minHeight: "70px",
                            px: 4.2,
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

            </Drawer>
        </Box>
    );
};

export default SideBar;

const WAITING = [
    {
        title: "Abracadabra",
    },
    {
        title: "Alakazam",
    },
    {
        title: "Beethoven",
    },
    {
        title: "Bingo",
    },
    {
        title: "Cinderella",
    },
    {
        title: "Dumbo",
    },
    {
        title: "Einstein",
    },
    {
        title: "Ferrari",
    },
    {
        title: "Gandhi",
    },
    {
        title: "Gulliver",
    },
    {
        title: "Hercules",
    }
];