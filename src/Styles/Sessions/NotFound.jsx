import {Box, styled} from "@mui/material";

export const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}));

export const JustifyBox = styled(FlexBox)(() => ({
    maxWidth: 320,
    flexDirection: 'column',
    justifyContent: 'center',
}));

export const IMG = styled('img')(() => ({
    width: '100%',
    marginBottom: '32px',
}));

export const NotFoundRoot = styled(FlexBox)(() => ({
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh !important',
}));