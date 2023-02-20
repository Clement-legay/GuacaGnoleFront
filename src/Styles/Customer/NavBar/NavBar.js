import {AppBar, Button, styled, Toolbar, Typography} from "@mui/material";
import {Box} from "@mui/system";

// use a custom prop a boolean prop (scrolled) and an int prop (height)
export const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'scrolled' && prop !== 'height'})
(({theme, scrolled, height}) => ({
    backgroundColor: 'transparent',
    boxShadow: "none",
    padding: "0 2rem",
    height: height,
    top: scrolled ? -height : 0,
    transition: "top 0.5s",
}));

export const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
});

export const StyledTitle = styled(Typography)({
    fontWeight: "bold",
    cursor: "pointer",
});

export const StyledBoxTitle = styled(Box)({
    display: "flex",
    alignItems: "center",
    "& .MuiTypography-root": {
        marginLeft: "0.5rem",
    },
});

export const StyledButton = styled(Button)({
    fontWeight: "bold",
    fontSize: "0.9rem",
    textTransform: "none",
    padding: "0.5rem 1rem",
    borderRadius: "1rem",
    "&:hover": {
        backgroundColor: "transparent",
    },
});