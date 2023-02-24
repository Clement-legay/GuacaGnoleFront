import Menu from '@mui/material/Menu';
import {StyledButton} from "../../../../Styles/Customer/NavBar/NavBar";
import {useContext, useEffect, useState} from "react";
import {ShoppingCart} from "@mui/icons-material";
import {Box, styled} from "@mui/system";
import {Button, CircularProgress, Divider, IconButton, List, ListItem, Typography} from "@mui/material";
import {MainContext} from "../../../../Context/MainContext";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CartMenu({navigate, sx}) {
    const { cart, setCartQuantity, fetchOfferById } = useContext(MainContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const [finalCartArray, setFinalCartArray] = useState(null)
    const open = Boolean(anchorEl);

    const cartSize = () => {
        let size = 0
        cart.forEach((item) => {
            size += item.quantity
        })
        return size
    }

    useEffect(() => {
        if (open) {
            (async () => {
                const finalCartArray = await Promise.all(cart.map(async (item) => {
                    const offer = await fetchOfferById(item.id)
                    return {
                        id: item.id,
                        name: offer.name,
                        quantity: item.quantity,
                        image: offer.imageUrl,
                        price: offer.price
                    }
                }))
                setFinalCartArray(finalCartArray)
            })()
        } else {
            setFinalCartArray(null)
        }
    }, [open, cart, fetchOfferById])

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
                sx={{
                    position: 'relative',
                }}
            >
                <ShoppingCart sx={sx}/>
                {cart.length > 0 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            fontSize: 12,
                            fontWeight: 'bold'
                        }}
                    >
                        {cartSize()}
                    </Box>
                )}
            </StyledButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <StyledShoppingCartContainer>
                    <Typography sx={{fontSize: 16, fontWeight: 'bold', textAlign: 'center', mb: 1}}>
                        Cart
                    </Typography>
                    <Divider/>
                    {finalCartArray === null ? (
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <CircularProgress/>
                        </Box>
                    ) : (
                        <List sx={{
                            overflowY: 'auto',
                            maxHeight: 200,
                        }}>
                            {finalCartArray.length === 0 ? (
                                <StyledOfferItemContainer>
                                    No items in cart
                                </StyledOfferItemContainer>
                            ) : (
                                finalCartArray.map((item) => (
                                    <StyledOfferItemContainer key={item.id}>
                                        <StyledImageContainer>
                                            <img src={item.image} alt={item.name} style={{height: "100%", width:"auto"}}/>
                                        </StyledImageContainer>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                            padding: 1
                                        }}>
                                            <Box sx={{fontSize: 14, fontWeight: 'bold'}}>
                                                {item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}
                                            </Box>
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <Box sx={{fontSize: 14, fontWeight: 'bold', marginRight: 1}}>
                                                    {item.price} €
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                        }}>
                                            <IconButton sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: 20,
                                                height: 20,
                                                backgroundColor: 'text.primary',
                                                color: 'white',
                                                fontSize: 9,
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'primary.dark'
                                                }
                                            }}
                                                 onClick={() => {
                                                     setCartQuantity(item.id, item.quantity  + 1)
                                                 }}
                                            >
                                                <ExpandLessIcon/>
                                            </IconButton>
                                            <Box sx={{fontSize: 14, fontWeight: 'bold', my:'2px'}}>
                                                {item.quantity}
                                            </Box>
                                            <IconButton sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: 20,
                                                height  : 20,
                                                backgroundColor: 'text.primary',
                                                color: 'white',
                                                fontSize: 9,
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'primary.dark'
                                                }
                                            }}
                                                 onClick={() => {
                                                     setCartQuantity(item.id, item.quantity - 1)
                                                 }}
                                            >
                                                <ExpandMoreIcon/>
                                            </IconButton>
                                        </Box>
                                    </StyledOfferItemContainer>
                                ))
                            )}
                        </List>
                    )}
                    <Divider/>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1}}>
                        <Button
                            variant="contained"
                            sx={{width: '100%'}}
                            disabled={finalCartArray === null || finalCartArray.length === 0}
                            onClick={() => {
                                navigate('/session/cart')
                                handleClose()
                            }}
                        >
                            Go to cart
                        </Button>
                    </Box>
                </StyledShoppingCartContainer>
            </Menu>
        </div>
    );
}

const StyledShoppingCartContainer = styled(Box)(
    ({theme}) => ({
        width: 290,
        maxHeight: 300,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 5,
        padding: '10px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    })
)

const StyledOfferItemContainer = styled(ListItem)(
    ({theme}) => ({
        height: 70,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 10px',
        '&:hover': {
            backgroundColor: theme.palette.background.default
        }
    })
)

const StyledImageContainer = styled(Box)(
    ({theme}) => ({
        width: 50,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    })
)