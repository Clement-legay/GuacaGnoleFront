import {Box, styled} from "@mui/system";

export const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

export const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

export const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}));

export const Root = styled(JustifyBox)(() => ({
    background: 'linear-gradient(120deg, #F44336 0%, #E91E63 50%, #9C27B0 100%)',

    minHeight: '100vh !important',
    width: '100%',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
    },
}));

export const RegisterForm = styled(JustifyBox)(() => ({
    background: 'linear-gradient(120deg, #F44336 0%, #E91E63 50%, #9C27B0 100%)',
    minHeight: '100vh !important',
    width: '100%',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
    },
}));

export const ForgotPasswordRoot = styled(JustifyBox)(() => ({
    background: 'linear-gradient(120deg, #F44336 0%, #E91E63 50%, #9C27B0 100%)',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        margin: '1rem',
        borderRadius: 12,
    },
}));
