import {Box, styled} from "@mui/system";

export const StyledContainer = styled(Box)(({theme}) => (
    {
        width: "100%",
        height: "80vh",
        overflow: "hidden",
        backgroundColor: "#000",
        position: "relative",
    }
));

export const StyledImageBox = styled(Box)(({theme}) => (
    {
        width: "40%",
        height: "auto",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "70%",
        clipPath: "ellipse(33% 50%)",
        ":before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "linear-gradient(90deg, transparent 0%, #000 100%)",
            clipPath: "ellipse(33% 50%)",
        },
        ":hover": {
            ":before": {
                top: "50%",
                left: "100%",
                transition: "all 1s ease",
            },
        },
    }
));

export const StyledImage = styled("img")(({theme}) => (
    {
        objectFit: "contain",
        width: "100%",
        height: "100%",

    }
));

export const StyledTextCard = styled(Box)(({theme}) => (
    {
        width: "28%",
        height: "auto",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "30%",
        padding: "2rem",
    }
));

export const StyledBigCard = styled(Box)(({theme}) => (
    {
        width: "100%",
        height: "100vh",
        position: "relative",
        backgroundColor:  "#eae8e8",
        "& h1": {
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.2,
            fontFamily: "Poppins",
            marginBottom: 20,
            textAlign: "center",
            [theme.breakpoints.down("md")]: {
                fontSize: 40,
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: 30,
            },
            [theme.breakpoints.down("xs")]: {
                fontSize: 20,
            },
        },
        "& p": {
            fontSize: 20,
            fontWeight: 400,
            fontFamily: "Poppins",
            lineHeight: 1.5,
            textAlign: "center",
            [theme.breakpoints.down("md")]: {
                fontSize: 16,
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: 14,
            },
            [theme.breakpoints.down("xs")]: {
                fontSize: 12,
            },
        },
        ":before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: 50,
            top: "-50px",
            left: 0,
            borderRadius: "50% 50% 0 0",
            backgroundColor:  "#eae8e8"
        },
    }
));