import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {StyledButton} from "../../../../Styles/Customer/NavBar/NavBar";
import {useState} from "react";

export default function ProfileMenu({isAuth, navigate, logUserOut}) {
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
                Dashboard
            </StyledButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {isAuth && <MenuItem onClick={() =>{navigate("/session/account")}}>My account</MenuItem>}
                {isAuth && <MenuItem onClick={() =>{logUserOut()}}>Logout</MenuItem>}
                {!isAuth && <MenuItem onClick={() => {navigate("/session/signin")}}>Login</MenuItem>}
                {!isAuth && <MenuItem onClick={() => {navigate("/session/signup")}}>Register</MenuItem>}
            </Menu>
        </div>
    );
}