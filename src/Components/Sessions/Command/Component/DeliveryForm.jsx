import {MainContext} from "../../../../Context/MainContext";
import React, {useContext, useState} from "react";
import {Formik} from "formik";
import {Button, CircularProgress, Divider, Grid, List, ListItem, TextField, Typography} from "@mui/material";
import {Box, styled} from "@mui/system";
import PlacesAutocomplete from "react-places-autocomplete";
import {
    StyledProductBox,
    StyledValidateBox,
    StyledValidateBoxSecond
} from "../../../../Styles/Sessions/Command/Command";

const DeliveryForm = ({handleValidate, cartTotalPrice, deliveryPrice}) => {
    const { user } = useContext(MainContext);
    const [address, setAddress] = useState("");
    const loading = user === undefined;

    const handleSubmit = (values) => {
        console.log(values);
    }

    const handleSelect = async (value) => {
        setAddress(value);
    };

    return (
        <Grid container spacing={2} justifyItems={"space-between"}>
            <Grid item xs={12} md={8} sx={{width:'100%', my:1}}>
                <StyledProductBox>
                    <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
                        <Grid item>
                            <StyledTitle>Delivery Address</StyledTitle>
                        </Grid>
                    </Grid>
                    <Divider sx={{width: "100%", my: 2}} color={"grey"}/>
                    {loading ? (
                        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", width: "100%", height: "30vh"}}>
                            <CircularProgress size={20}/>
                        </Box>
                    ) : (
                        <Formik
                            initialValues={{
                                address: user.address,
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({values, handleBlur, handleChange, handleSubmit}) => (
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
                                        <Grid item>
                                            <PlacesAutocomplete
                                                value={address}
                                                onChange={setAddress}
                                                onSelect={handleSelect}
                                            >
                                                {({
                                                      getInputProps,
                                                      suggestions,
                                                      getSuggestionItemProps,
                                                      loading,
                                                  }) => (
                                                    <div>
                                                        <TextField
                                                            fullWidth
                                                            type="address"
                                                            label="Address"
                                                            name="Address"
                                                            size="big"
                                                            onChange={setAddress}
                                                            onBlur={handleBlur}
                                                            value={address}
                                                            variant="outlined"
                                                            sx={{
                                                                maxWidth: 250,
                                                                borderRadius: 1,
                                                                // change label font style
                                                                "& .MuiInputLabel-root": {
                                                                    fontSize: "1rem",
                                                                    fontWeight: "500",
                                                                    color: "black",
                                                                },
                                                                // change border style
                                                                "& .MuiOutlinedInput-root": {
                                                                    borderRadius: 1,
                                                                    "& fieldset": {
                                                                        borderColor: "grey.500",
                                                                    },
                                                                    "&.Mui-focused fieldset": {
                                                                        borderColor: "primary",
                                                                    },
                                                                    // on hover
                                                                    "&:hover fieldset": {
                                                                        borderColor: "grey.500",
                                                                    },
                                                                },
                                                                // change input font style
                                                                "& .MuiInputBase-input": {
                                                                    fontSize: "1rem",
                                                                    fontWeight: "500",
                                                                    color: "black",
                                                                },

                                                            }}
                                                            {...getInputProps({ placeholder: "Type address" })}
                                                        />
                                                        <div>
                                                            {loading && <div>Loading...</div>}
                                                            {suggestions.map((suggestion) => {
                                                                const className = suggestion.active
                                                                    ? "suggestion-item--active"
                                                                    : "suggestion-item";
                                                                const style = suggestion.active
                                                                    ? {
                                                                        backgroundColor: "grey.200",
                                                                        cursor: "pointer",
                                                                        width: "100%",
                                                                    }
                                                                    : {
                                                                        backgroundColor: "grey.100",
                                                                        cursor: "pointer",
                                                                        width: "100%",
                                                                    };
                                                                return (
                                                                    <List
                                                                        {...getSuggestionItemProps(suggestion, {
                                                                            className,
                                                                            style,
                                                                        })}
                                                                    >
                                                                        <ListItem style={{
                                                                            maxWidth: "200",
                                                                            ":hover": {
                                                                                backgroundColor: "grey.200",
                                                                            }
                                                                        }}>
                                                                            {suggestion.description}
                                                                        </ListItem>
                                                                    </List>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </PlacesAutocomplete>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        </Formik>
                    )}
                </StyledProductBox>
                <StyledValidateBoxSecond>
                    <Grid container spacing={1} alignItems={"center"} justifyContent={"space-between"} sx={{px:1, py:1}}>
                        <Grid item xs={4}>
                            <Button variant={"contained"} color={"primary"} sx={{width:'100%', my:1}} onClick={handleValidate}>
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
                    <Button variant={"contained"} color={"primary"} sx={{width:'100%', my:1}} onClick={handleValidate}>
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

export default DeliveryForm;

const StyledTitle = styled(Typography)(
    ({theme}) => ({
        color: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: 20,
    })
)