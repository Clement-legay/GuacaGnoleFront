import {Fragment, useContext, useEffect} from "react";
import {MainContext} from "../../../Context/MainContext";
import {
    StyledBigCard,
    StyledContainer,
    StyledImage,
    StyledImageBox,
    StyledTextCard
} from "../../../Styles/Customer/Home/Home";
import {Typography} from "@mui/material";
const background = require("../../../Assets/img/backgrounds/background_2.png");

const Home = () => {
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
                        Welcome to the Customer Portal
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec
                        tincidunt luctus, nunc odio lacinia nisl, vitae aliquet nunc nunc vel nisl. Sed
                        euismod, nisl nec tincidunt luctus, nunc odio lacinia nisl, vitae aliquet nunc
                        nunc vel nisl.
                    </Typography>
                </StyledTextCard>
                <StyledImageBox>
                    <StyledImage src={background} alt="illustration"/>
                </StyledImageBox>
            </StyledContainer>
            <StyledBigCard>

            </StyledBigCard>
        </Fragment>
    )
};

export default Home;
