import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {StyledButton} from "../../../../Styles/Customer/NavBar/NavBar";
import {useContext, useEffect, useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Box} from "@mui/system";
import {Divider, Typography} from "@mui/material";
import {MainContext} from "../../../../Context/MainContext";

export default function ProfileMenu({isAuth, navigate, logUserOut, sx}) {
    const { user } = useContext(MainContext);
    const [isAuthenticate, setIsAuthenticate] = useState(isAuth());
    const [isAdminUser, setIsAdminUser] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setIsAuthenticate(isAuth());
    }, [isAuth])

    useEffect(() => {
        if (isAuthenticate)
            setIsAdminUser(user.roleId === 1);
    }, [user, isAuthenticate])

    return (
        <div>
            <StyledButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <AccountCircleIcon sx={sx}/>
            </StyledButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    width: 200,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                {isAuthenticate && (
                    <Box sx={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <Typography>
                            {user.roleId === 1 ? "Admin" : "Customer"}
                        </Typography>
                    </Box>
                )}

                <Divider sx={{width: "100%", my:1}}/>
                {(isAuthenticate && isAdminUser) && <MenuItem onClick={() =>{navigate("/admin/")}}>Admin</MenuItem>}
                {isAuthenticate && <MenuItem onClick={() =>{navigate("/session/account")}}>My account</MenuItem>}
                {isAuthenticate && <MenuItem onClick={() =>{handleClose(); logUserOut()}}>Logout</MenuItem>}
                {!isAuthenticate && <MenuItem onClick={() => {navigate("/session/signin")}}>Login</MenuItem>}
                {!isAuthenticate && <MenuItem onClick={() => {navigate("/session/signup")}}>Register</MenuItem>}
            </Menu>
        </div>
    );
}