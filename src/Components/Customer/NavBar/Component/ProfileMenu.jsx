import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {StyledButton} from "../../../../Styles/Customer/NavBar/NavBar";
import {useContext, useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Box} from "@mui/system";
import {Divider, Typography} from "@mui/material";
import {MainContext} from "../../../../Context/MainContext";

export default function ProfileMenu({navigate, logUserOut, sx}) {
    const { user, isAuth, canAdmin } = useContext(MainContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                {isAuth() && (
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

                {isAuth() && <Divider sx={{width: "100%", my:1}}/>}
                {(isAuth() && canAdmin()) && <MenuItem onClick={() =>{navigate("/admin/")}}>Admin</MenuItem>}
                {isAuth() && <MenuItem onClick={() =>{navigate("/session/account")}}>My account</MenuItem>}
                {isAuth() && <MenuItem onClick={() =>{handleClose(); logUserOut()}}>Logout</MenuItem>}
                {!isAuth() && <MenuItem onClick={() => {navigate("/session/signin")}}>Login</MenuItem>}
                {!isAuth() && <MenuItem onClick={() => {navigate("/session/signup")}}>Register</MenuItem>}
            </Menu>
        </div>
    );
}