import {Container, Divider, StepLabel} from "@mui/material";
import React, {Fragment, useContext, useEffect, useState} from "react";
import {MainContext} from "../../../Context/MainContext";
import Validation from "./Component/Validation";
import NavBarPayment from "./Component/NavBarPayment";
import {Box} from "@mui/system";
import {StyledStepperContainer} from "../../../Styles/Sessions/Command/Command";
import DoneIcon from '@mui/icons-material/Done';
import IconButton from "@mui/material/IconButton";

const steps = [
    {id:1, label: 'Validation du panier'},
    {label: 'divider'},
    {id:2, label: 'Informations de livraison'},
    {label: 'divider'},
    {id:3, label: 'Paiement'},
    {label: 'divider'},
    {id:4, label: 'Confirmation de commande'},
];

const HorizontalLabelPositionBelowStepper = ({step, setStep}) => {
    return (
        <Box sx={{ width: '100%', display:"flex", alignItems:"center", justifyContent:"center" }}>
            {steps.map((item, index) => (
                item.label === "divider" ? (
                    <Divider key={index} sx={{width:150, my:2, mx:2}} color={"grey"}/>
                ) : (
                    <Box key={index}>
                        <IconButton onClick={() => setStep(item.id - 1)} sx={{
                            backgroundColor: step >= index ? "primary.main" : "grey",
                            width: 30,
                            height: 30,
                            "&:hover": {
                                opacity: 0.8,
                                backgroundColor: step >= index ? "primary.main" : "grey",
                            },
                        }}>
                            {step >= item.id ? (
                                <DoneIcon sx={{color: "white", fontSize: 15}} />
                            ) : (
                                <StepLabel sx={{color: "white", fontSize: 17}}>{item.id}</StepLabel>
                            )
                            }
                        </IconButton>
                    </Box>
                )
            ))}
        </Box>
    );
}

const Command = () => {
    const {cart, fetchOfferById} = useContext(MainContext);
    const [finalCartArray, setFinalCartArray] = useState([])
    const [step, setStep] = useState(0)

    const cartSize = () => {
        let size = 0
        cart.forEach((item) => {
            size += item.quantity
        })
        return size
    }

    const cartTotalPrice = () => {
        let totalPrice = 0
        finalCartArray.forEach((item) => {
            totalPrice += item.price * item.quantity
        })
        return totalPrice
    }

    const deliveryPrice = () => {
        let deliveryPrice = 0
        if (cartTotalPrice() < 20) {
            deliveryPrice = 2.5
        }
        return deliveryPrice
    }

    const handleValidate = () => {
        setStep(step + 1)
    }

    useEffect(() => {
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
    }, [cart, fetchOfferById])

    return (
        <Fragment>
            <NavBarPayment cartSize={cartSize}/>
            <Container maxWidth="lg">
                <StyledStepperContainer>
                    <HorizontalLabelPositionBelowStepper step={step} setStep={setStep}/>
                </StyledStepperContainer>

                {step === 0 &&
                    <Validation cartSize={cartSize} cartTotalPrice={cartTotalPrice} deliveryPrice={deliveryPrice} handleValidate={handleValidate} finalCartArray={finalCartArray} />
                }
            </Container>

        </Fragment>
    )
}

export default Command;