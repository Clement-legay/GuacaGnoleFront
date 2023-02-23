import {styled} from "@mui/system";
import {Box, Card, CardMedia, TextField} from "@mui/material";

export const SearchBox = styled(Box)({
    width: '100%',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    paddingTop: '100px',
});

export const ImgLogoBg = styled("img")({
    width: '18vw',
    height: "auto",
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '28%',
    left: '50%',
});

export const ImgLogo = styled("img")({
    width: '4vw',
    height: "auto",
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '28%',
    left: '50%',
});

export const SearchInput = styled(TextField)({
    width: '100%',
    marginBottom: '2rem',
});

export const FilterContainer = styled(Box)({
    margin: '0 auto',
    width: '100%',
    padding: '20px 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
    backgroundColor: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
});

export const ProductImage = styled(CardMedia)({
    height: 'auto',
    width: '30%',
    aspectRatio: '1/4',
    transition: 'transform 0.2s',
    transform: 'scale(1) rotate(20deg)',
    '&:hover': {
        transform: 'scale(1.02) rotate(19deg)',
        cursor: 'pointer',
    },

});

export const ProductCard = styled(Card)({
    maxWidth: '345px',
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "none",
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // when productCard is hovered, transform the image
    '&:hover': {
        cursor: 'pointer',
        "& $ProductImage": {
            transform: 'scale(1.02) rotate(19deg)',
        },
    },
});


export const IconContainer = styled(Box, {shouldForwardProp: (prop) => prop !== 'text'})(
    ({text}) => ({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            // display text only on hover
            "&:hover:after": {
                content: text ? `"${text}"` : '""',
                position: 'absolute',
                top: '100%',
                left: '50%',
                width: 'max-content',
                transform: 'translateX(-50%)',
                backgroundColor: '#fff',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: '#000',
                zIndex: 1,
            },
        }
    ),
);