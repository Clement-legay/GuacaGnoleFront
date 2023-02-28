import {Box} from "@mui/system";
import {Divider, Grid, styled} from "@mui/material";
import React from "react";
import {StyledTitle} from "../../../../Styles/Customer/NavBar/NavBar";

const CommandConfirm = ({cart, cartTotalPrice, deliveryPrice}) => {


    return (
        <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
            <Grid item xs={12} md={8} sx={{width:'100%', my:1}}>
                <StyledBoxContainer>
                    <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
                        <Grid item>
                            <StyledTitle>Payment</StyledTitle>
                        </Grid>
                    </Grid>
                    <Divider sx={{width: "100%", my: 2}} color={"grey"}/>
                    {/*// récapitulatif de la commande*/}
                    <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {/*<DataTable*/}
                        {/*    columns={[*/}
                        {/*        {field: 'name', headerName: 'Name', width: 200},*/}
                        {/*        {field: 'quantity', headerName: 'Quantity', width: 200},*/}
                        {/*        {field: 'price', headerName: 'Price', width: 200},*/}
                        {/*    ]}*/}
                        {/*    rows={cart}*/}
                        {/*    disableSelectionOnClick*/}
                        {/*/>*/}
                        {/*<Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', mt: 2}}>*/}
                        {/*    <Typography variant={"body1"}>Total price</Typography>*/}
                        {/*    <Typography variant={"body1"}>{cartTotalPrice()} €</Typography>*/}
                        {/*    <Typography variant={"body1"}>Delivery price</Typography>*/}
                        {/*    <Typography variant={"body1"}>{deliveryPrice()} €</Typography>*/}
                        {/*    <Typography variant={"body1"}>Total price</Typography>*/}
                        {/*    <Typography variant={"body1"}>{cartTotalPrice() + deliveryPrice()} €</Typography>*/}
                        {/*</Box>*/}

                    </Box>





                </StyledBoxContainer>
            </Grid>
        </Grid>
    )
}

export default CommandConfirm;

const StyledBoxContainer = styled(Box)(
    ({theme}) => ({
        width: '100%',
        height: '40vh',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e0e0e0',
        borderRadius: '5px',
        color: "black",
        padding: '1rem',
    })
)