import React, {Fragment, useEffect, useState} from "react";
import {Button, CircularProgress, Divider, Grid, Typography} from "@mui/material";
import {Box, styled} from "@mui/system";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
    StyledProductBox,
    StyledValidateBox,
    StyledValidateBoxSecond
} from "../../../../Styles/Sessions/Command/Command";

const PaymentRedirect = ({handleValidate, cartTotalPrice, deliveryPrice}) => {
    const [loading, setLoading] = useState(true);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        setTimeout( () => {
            setLoading(false);
            setChecking(true)
        }, 3000)
    }, [])

    useEffect(() => {
        if (checking) {
            setTimeout( () => {
                setChecking(false);
                handleValidate();
            }, 3000)
        }
    }, [checking, handleValidate])

    return (
        <Grid container spacing={2} justifyItems={"space-between"}>
            <Grid item xs={12} md={8} sx={{width:'100%', my:1}}>
                <StyledProductBox>
                    <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
                        <Grid item>
                            <StyledTitle>Payment</StyledTitle>
                        </Grid>
                    </Grid>
                    <Divider sx={{width: "100%", my: 2}} color={"grey"}/>
                    <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", height:"40vh", justifyContent:"center"}}>
                        {loading ? (
                            <Fragment>
                                <Typography variant={"body1"} sx={{fontWeight: "bold"}}>
                                    Vous allez être redirigé vers la page de paiement
                                </Typography>
                                <Typography variant={"body1"} sx={{fontWeight: "bold"}}>
                                    Merci de votre confiance
                                </Typography>
                                <CircularProgress sx={{my:2}} size={30}/>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Typography variant={"body1"} sx={{fontWeight: "bold"}}>
                                    Nous vérifions votre paiement
                                </Typography>
                                <Typography variant={"body1"} sx={{fontWeight: "bold"}}>
                                    Merci de votre confiance
                                </Typography>
                                <CheckCircleOutlineIcon sx={{my:2}} color={"success"} fontSize={"large"}/>
                            </Fragment>
                        )}
                    </Box>
                </StyledProductBox>
                <StyledValidateBoxSecond>
                    <Grid container spacing={1} alignItems={"center"} justifyContent={"space-between"} sx={{px:1, py:1}}>
                        <Grid item xs={4}>
                            <Button variant={"contained"} color={"primary"} sx={{width:'100%', my:1}} disabled>
                                Valider vos informations
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            <Box sx={{display: 'flex', flexDirection:'column', width: '100%'}}>
                                <Typography variant={"body1"} sx={{fontWeight:"bold"}}>
                                    Total: {cartTotalPrice()} €
                                </Typography>
                                <Typography sx={{fontWeight:"thin", fontSize: '10px'}}>
                                    En passant votre commande, vous acceptez les Conditions générales de vente de GuacaGnole.
                                    Veuillez consulter notre Notice Protection de vos informations personnelles,
                                    notre Notice Cookies et notre Notice Annonces publicitaires basées sur vos centres d’intérêt.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </StyledValidateBoxSecond>
            </Grid>
            <Grid item xs={12} md={4}>
                <StyledValidateBox>
                    <Button variant={"contained"} color={"primary"} sx={{width:'100%', my:1}} disabled>
                        Valider vos informations
                    </Button>
                    <Typography variant={"body2"} align={"center"}>
                        En passant votre commande, vous acceptez les Conditions générales de vente de GuacaGnole.
                        Veuillez consulter notre Notice Protection de vos informations personnelles,
                        notre Notice Cookies et notre Notice Annonces publicitaires basées sur vos centres d’intérêt.
                    </Typography>
                    <Divider sx={{width:'100%', my:2}} color={"grey"}/>
                    <Typography variant={"body1"} align={"center"} sx={{fontWeight:"bold"}}>
                        Récapitulatif de votre commande
                    </Typography>
                    <Grid container spacing={2} alignItems={"center"} justifyContent={"space-between"} sx={{px:4, py:1}}>
                        <Grid item>
                            <Typography variant={"body2"} sx={{fontWeight:"thin"}}>
                                Sous-total
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body2"} sx={{fontWeight:"thin"}}>
                                {cartTotalPrice()} €
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems={"center"} justifyContent={"space-between"} sx={{px:4, py:1}}>
                        <Grid item>
                            <Typography variant={"body2"} sx={{fontWeight:"thin"}}>
                                Frais de livraison
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body2"} sx={{fontWeight:"thin"}}>
                                {deliveryPrice()} €
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{width:'100%', my:2}} color={"grey"}/>
                    <Grid container spacing={2} alignItems={"center"} justifyContent={"space-between"} sx={{px:4, py:1}}>
                        <Grid item>
                            <Typography variant={"body1"} sx={{fontWeight:"bold"}}>
                                Total
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body1"} sx={{fontWeight:"bold"}}>
                                {cartTotalPrice() + deliveryPrice()} €
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant={"body2"} align={"center"}>
                        Total de la commande, TVA incluse.
                    </Typography>
                </StyledValidateBox>
            </Grid>
        </Grid>
    )
}

export default PaymentRedirect;

const StyledTitle = styled(Typography)(
    ({theme}) => ({
        color: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: 20,
    })
)