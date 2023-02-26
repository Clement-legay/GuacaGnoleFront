import {MainContext} from "../../../../Context/MainContext";
import {useContext} from "react";
import {Formik} from "formik";
import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import {Box, styled} from "@mui/system";

const DeliveryForm = () => {
    const { user } = useContext(MainContext);
    const loading = user === undefined;
    const handleSubmit = (values) => {
        console.log(values);
    }

    return (
        <StyledDeliveryFormContainer>
            <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
                <Grid item>
                    <StyledTitle>Delivery Address</StyledTitle>
                </Grid>
            </Grid>

            {loading ? (
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", width: "100%"}}>
                    <CircularProgress size={20}/>
                </Box>
            ) : (
                <Formik
                    initialValues={{
                        city: user.city,
                        street: user.street,
                        postalCode: user.postalCode,
                    }}
                    onSubmit={handleSubmit}
                    >
                        {({values, handleChange, handleSubmit}) => (
                        <StyledForm onSubmit={handleSubmit}>
                            <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
                                <Grid item>
                                    <StyledInput
                                        type="text"
                                        name="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                    />
                                </Grid>
                                <Grid item>
                                    <StyledInput
                                        type="text"
                                        name="street"
                                        value={values.street}
                                        onChange={handleChange}
                                        placeholder="Street"
                                    />
                                </Grid>
                                <Grid item>
                                    <StyledInput
                                        type="text"
                                        name="postalCode"
                                        value={values.postalCode}
                                        onChange={handleChange}
                                        placeholder="Postal Code"
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant={"body1"}>
                                        Si les informations sont correctes, cliquez sur le bouton "Valider" ci-dessous.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <StyledButton type="submit">Valider</StyledButton>
                                </Grid>
                            </Grid>
                        </StyledForm>
                    )}
                </Formik>
            )}

        </StyledDeliveryFormContainer>
    )
}

export default DeliveryForm;

const StyledDeliveryFormContainer = styled(Box)(
    ({theme}) => ({
        backgroundColor: theme.palette.background.default,
        borderRadius: 5,
        width: "100%",
        margin: "10px 0",
        padding: '10px 10px',
        border: "1px solid #e0e0e0",
        color: "black",
    })
)

const StyledTitle = styled(Typography)(
    ({theme}) => ({
        color: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: 20,
    })
)

const StyledForm = styled("form")(
    ({theme}) => ({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    })
)

const StyledInput = styled("input")(
    ({theme}) => ({
        width: "100%",
        height: 40,
        padding: "0 10px",
        border: "1px solid #e0e0e0",
        borderRadius: 5,
        outline: "none",
        fontSize: 16,
        color: "black",
        backgroundColor: "white",
        transition: "all 0.3s ease",
        "&:focus": {
            border: `1px solid ${theme.palette.primary.main}`,
        }
    })
)

const StyledButton = styled(Button)(
    ({theme}) => ({
        width: "100%",
        height: 40,
        padding: "0 10px",
        border: "1px solid #e0e0e0",
        borderRadius: 5,
        outline: "none",
        fontSize: 16,
        color: "black",
        backgroundColor: "white",
        transition: "all 0.3s ease",
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
        }
    })
)