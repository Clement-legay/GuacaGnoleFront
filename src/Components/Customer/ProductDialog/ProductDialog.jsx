import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import {forwardRef, useContext, useEffect, useState} from "react";
import {CircularProgress, Grid} from "@mui/material";
import {Box} from "@mui/system";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
    StyledBottleData, StyledBottleImg,
    StyledBottleImgContainer, StyledButtonRow,
    StyledContainerDesc, StyledDataContainer,
    StyledExitButton, StyledImgSlider,
    StyledButton, StyledContainerComments

} from "../../../Styles/Customer/ProductDialog/ProductDialog";
import {MainContext} from "../../../Context/MainContext";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const ProductDialog = ({setOpen, open, selected, setSelected}) => {
    const { fetchOfferById, fetchDomainById, fetchRegionById, fetchAppellationById, fetchAlcoholTypeById, addToCart } = useContext(MainContext)
    const [products, setProducts] = useState([]);
    const [offer, setOffer] = useState(null);
    const [active, setActive] = useState(0);
    const loading = offer === null || products.length === 0;

    const handleAddToCart = () => {
        addToCart(offer.id)
    }

    const handleBuyNow = () => {
        console.log('Buy Now')
    }

    useEffect( () => {
        if (loading && selected !== null) {
            (async () => {
                const result = await fetchOfferById(selected);

                let stock = 0;
                for (let i = 0; i < result.productOffers.length; i++) {
                    const region = await fetchRegionById(result.productOffers[i].product.regionId);
                    const appellation = await fetchAppellationById(result.productOffers[i].product.appellationId);
                    const alcoholType = await fetchAlcoholTypeById(result.productOffers[i].product.alcoholTypeId);
                    const domain = await fetchDomainById(result.productOffers[i].product.domainId);

                    const ratio = result.productOffers[i].product.stock / result.productOffers[i].quantityProduct;
                    if (stock === 0 || ratio < stock) {
                        stock = ratio;
                    }

                    result.productOffers[i].product.region = await region;
                    result.productOffers[i].product.appellation = await appellation;
                    result.productOffers[i].product.alcoholType = await alcoholType;
                    result.productOffers[i].product.domain = await domain;
                }
                result.remains = stock;

                setOffer(result)

                setProducts(result.productOffers.map(productOffer => ({
                    ...productOffer.product,
                    quantity: productOffer.quantityProduct
                })))


                setOffer(result)
            })()
        }
    }, [loading, selected, fetchOfferById, fetchRegionById, fetchAppellationById, fetchAlcoholTypeById, fetchDomainById])

    const handleClose = () => {
        setOffer(null)
        setProducts([])
        setSelected(null)
        setOpen(false);
        setActive(0);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            {loading ? (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh'
                }}>
                    <CircularProgress/>
                </Box>
            ) : (

                <Grid container justifyContent="center" style={{height: '100vh'}}>
                    <Grid item xs={12} lg={5}>
                        <StyledBottleImgContainer>

                            <StyledExitButton
                                startIcon={<ChevronLeftIcon/>}
                                onClick={handleClose}
                            >
                                Go back
                            </StyledExitButton>
                            <StyledBottleData product={products[active]}/>

                            <StyledBottleImg src={products[active].imageUrl} alt={selected.name}/>
                            <StyledImgSlider products={products} active={active} setActive={setActive}/>
                        </StyledBottleImgContainer>
                    </Grid>
                    <Grid item xs={12} lg={7}>
                        <StyledDataContainer>
                            <StyledContainerDesc>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <Typography variant="h2" component="h1" gutterBottom>
                                            {offer.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6" component="h2" gutterBottom>
                                            {offer.price} €
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item xs={12}>
                                        <Typography variant="h6" component="h2" gutterBottom>
                                            {offer.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <StyledButtonRow>
                                    <StyledButton
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleAddToCart}
                                    >
                                        Add to cart
                                    </StyledButton>

                                    <StyledButton
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleBuyNow}
                                    >
                                        Buy now
                                    </StyledButton>

                                </StyledButtonRow>
                            </StyledContainerDesc>
                            <StyledContainerComments>
                                <Typography variant="h4" component="h2" gutterBottom>
                                    Comments
                                </Typography>
                                {offer.comments.length !== 0 ? (
                                    offer.comments.map(comment => (
                                    <Grid container justifyContent="space-between" alignItems="center">
                                        <Grid item xs={12}>
                                            <Typography variant="h6" component="h2" gutterBottom>
                                                {comment.content}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ))) : (
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        No comments yet
                                    </Typography>
                                )}
                            </StyledContainerComments>
                        </StyledDataContainer>
                    </Grid>
                </Grid>
            )}
        </Dialog>
    );
}

export default ProductDialog;