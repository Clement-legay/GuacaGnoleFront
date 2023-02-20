import { styled } from "@mui/material";

export const Main = styled("main", {shouldForwardProp:(prop) => prop !== 'ispath'})
(({ theme, ispath }) => ({
    marginTop: ispath ? 0 : 120,
}));

export const HeaderDodger = styled("div")(({ theme }) => ({
    paddingTop: "60px",
    width: "100%",
}));

