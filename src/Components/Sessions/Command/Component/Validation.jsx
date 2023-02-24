import {Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useContext} from "react";
import {MainContext} from "../../../../Context/MainContext";
import {
    StyledProductBox,
    StyledValidateBox,
    StyledValidateBoxSecond
} from "../../../../Styles/Sessions/Command/Command";

const Validation = ({deliveryPrice, cartSize, finalCartArray, cartTotalPrice, handleValidate}) => {
    const {setCartQuantity} = useContext(MainContext)

    const handleQuantityUpdate = (id, quantity) => {
        setCartQuantity(id, quantity)
    }

    return (
        <Grid container spacing={2} justifyItems={"space-between"}>
            <Grid item xs={12} md={8} sx={{width:'100%', my:1}}>
                <StyledProductBox>
                    <Grid container spacing={2} alignItems={"center"} justifyContent={"space-between"} sx={{px:4, py:1}}>
                        <Grid item>
                            <Typography variant={"body1"} sx={{fontWeight:"bold"}}>
                                Votre commande
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body1"} sx={{fontWeight:"bold"}}>
                                {cartSize()} article{cartSize() > 1 ? "s" : ""}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{width:'100%', my:2}} color={"grey"}/>
                    {finalCartArray.map((item) => {
                        return (
                            <Grid key={item.id} container spacing={2} alignItems={"center"} justifyContent={"space-between"} sx={{px:4, py:1}}>
                                <Grid item>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 100,
                                        height: 100,
                                    }}>
                                        <img src={item.image} alt={item.name} style={{ width: "auto", height: "100%" }} />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{
                                        width: 150,
                                        overflow: 'hidden',
                                    }}>
                                        <Typography variant={"body2"} sx={{fontWeight:"bold"}}>
                                            {item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Typography variant={"body2"} sx={{fontWeight:"bold"}}>
                                        <FormControl fullWidth>
                                            <InputLabel id={"select-quantity"} sx={{color:"black"}}>Quantité</InputLabel>
                                            <Select
                                                labelId="select-quantity"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityUpdate(item.id, e.target.value)}
                                                sx={{
                                                    width: 70,
                                                    height: 30,
                                                    fontSize: 12,
                                                    fontWeight: 400,
                                                    color: "black",
                                                    backgroundColor: "grey.100",
                                                    "&:hover": {
                                                        backgroundColor: "grey.200",
                                                    },
                                                    "&:focus": {
                                                        backgroundColor: "grey.200",
                                                    },
                                                    "& .MuiSvgIcon-root": {
                                                        color: "black",
                                                    },
                                                }}
                                            >
                                                {[...Array(10).keys()].map((item, index) => {
                                                    return (
                                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant={"body2"} sx={{fontWeight:"bold"}}>
                                        {item.price} €
                                    </Typography>
                                </Grid>
                            </Grid>
                        )
                    })}
                </StyledProductBox>
                <StyledValidateBoxSecond>
                    <Grid container spacing={1} alignItems={"center"} justifyContent={"space-between"} sx={{px:1, py:1}}>
                        <Grid item xs={4}>
                            <Button variant={"contained"} color={"primary"} sx={{width:'100%', my:1}} onClick={handleValidate}>
                                Passer la commande
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
                    <Button variant={"contained"} color={"primary"} sx={{width:'100%', my:1}} onClick={handleValidate}>
                        Passer la commande
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

export default Validation;