import {Fragment, useContext, useEffect} from "react";
import {MainContext} from "../../../Context/MainContext";
import {
    StyledBigCard,
    StyledContainer,
    StyledImage,
    StyledImageBox,
    StyledTextCard
} from "../../../Styles/Customer/Home/Home";
import {Button, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
const background = require("../../../Assets/img/backgrounds/background_2.png");

const Home = () => {
    const navigate = useNavigate();
    const { setRouteName } = useContext(MainContext)

    useEffect(() => {
        setRouteName("Home")
    }, [setRouteName])

    return (
        <Fragment>
            <StyledContainer>
                <StyledTextCard>
                    <Typography
                        sx={{
                            fontSize: "2.5em",
                            mb: 1.5,
                            lineHeight: 0.9,
                            fontFamily: "Eloque",
                            display: 'flex',
                            alignItems: 'center',
                            color: "text.title",
                            '& .MuiSvgIcon-root': {
                                mr: 0.5,
                                fontSize: 16,
                            }}}
                        gutterBottom
                    >
                        Bienvenue chez GuacaGnole,
                    </Typography>
                    <Typography sx={{
                        fontSize: "1.3em",
                        mb: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        color: "text.subtitle",
                        '& .MuiSvgIcon-root': {
                            mr: 0.5,
                            fontSize: 16,
                        },
                    }} gutterBottom>
                        Votre boutique en ligne spécialisée dans la vente de vins
                        de qualité pour un public raffiné. Nous sommes passionnés
                        par le vin et nous avons soigneusement sélectionné pour vous
                        une large gamme de bouteilles provenant des meilleurs vignobles
                        du monde entier.
                    </Typography>
                    <Button onClick={() => {
                        navigate("/search")
                    }} variant="contained" sx={{fontSize: "1.2em", mt: 2, mb: 2, backgroundColor: "rgb(47,40,34)", color: "text.title", "&:hover": {backgroundColor: "rgb(68,56,45)"}}}>
                        Découvrir nos vins
                    </Button>
                </StyledTextCard>
                <StyledImageBox>
                    <StyledImage src={background} alt="illustration"/>
                </StyledImageBox>
            </StyledContainer>
            <StyledBigCard>
                <Container maxWidth={"lg"}>

                </Container>
            </StyledBigCard>
        </Fragment>
    )
};

export default Home;
