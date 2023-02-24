import {Box, styled} from "@mui/system";

export const StyledStepperContainer = styled(Box)(
    ({theme}) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    })
)

export const StyledProductBox = styled(Box)(
    ({theme}) => ({
        backgroundColor: theme.palette.background.default,
        borderRadius: 5,
        width: "100%",
        margin: "10px 0",
        padding: 10,
        border: "1px solid #e0e0e0",
        color: "black",
    })
);

export const StyledValidateBox = styled(Box)(
    ({theme}) => ({
        backgroundColor: theme.palette.background.default,
        borderRadius: 5,
        width: "100%",
        margin: "10px 0",
        padding: '10px 10px',
        border: "1px solid #e0e0e0",
        color: "black",
    })
);

export const StyledValidateBoxSecond = styled(Box)(
    ({theme}) => ({
        backgroundColor: theme.palette.background.default,
        borderRadius: 5,
        width: "100%",
        margin: "10px 0",
        padding: 10,
        border: "1px solid #e0e0e0",
        color: "black",
    })
);