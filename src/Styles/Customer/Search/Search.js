import {styled} from "@mui/system";
import {Box, Card, CardMedia, TextField} from "@mui/material";

export const SearchBox = styled(Box)({
    width: '100%',
    height: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
});

export const SearchInput = styled(TextField)({
    width: '100%',
    marginBottom: '2rem',
});

export const ProductCard = styled(Card)({
    maxWidth: '345px',
    boxShadow: '0px 3px 6px #00000029',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.02)',
    },
});

export const ProductImage = styled(CardMedia)({
    height: '140px',
});