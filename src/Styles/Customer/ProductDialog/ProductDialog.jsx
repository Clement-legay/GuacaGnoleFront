import {Box, Button, List, ListItem, styled} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {CalendarMonth, Euro, Liquor, LocalOffer, Place, Terrain} from "@mui/icons-material";

export const StyledBottleImgContainer = styled(Box)
(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    position: 'relative',
    background: 'linear-gradient(90deg, hsla(208, 33%, 21%, 1) 0%, hsla(211, 36%, 46%, 1) 100%)',
}));

export const StyledBottleImg = styled('img')
(({theme}) => ({
    width: 'auto',
    height:"70vh",
    filter: 'drop-shadow(0 0 0.75rem #000)'
}));

export const StyledExitButton = styled(Button)
(({theme}) => ({
    position: 'absolute',
    top: 20,
    left: 20,
    color: '#fff'
}));

export const StyledImgSliderClass = styled('div')
(({theme}) => ({
    position: 'absolute',
    bottom: 20,
    left: '50%',
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    transform: 'translate(-50%, -50%)',
    '& > *': {
        margin: '0 5px'
    },
}));

export const StyledImgSlider = ({products, active, setActive}) => {
    return (
        <StyledImgSliderClass>
            {products.map((product, i) => (
                <StyledImgSliderCard key={i} active={active === i} onClick={() => setActive(i)}>
                    <img src={product.imageUrl} alt="bottle"/>
                </StyledImgSliderCard>
            ))}
        </StyledImgSliderClass>
    )
}

export const StyledBottleData = ({product}) => {
    return (
        <StyledBottleDataClass>
            <List>
                {product.millesime !== 0 && (
                    <StyledBottleDataItem>
                        <CalendarMonth/>
                        <ListItemText primary={product.millesime}/>
                    </StyledBottleDataItem>
                )}
                <StyledBottleDataItem>
                    <Terrain/>
                    <ListItemText primary={product.domain.name.length > 20 ? product.domain.name.substring(0, 20) + "..." : product.domain.name}/>
                </StyledBottleDataItem>
                <StyledBottleDataItem>
                    <Place/>
                    <ListItemText primary={product.region.name.length > 20 ? product.region.name.substring(0, 20) + "..." : product.region.name}/>
                </StyledBottleDataItem>
                <StyledBottleDataItem>
                    <Liquor/>
                    <ListItemText primary={product.alcoholType.label.length > 20 ? product.alcoholType.label.substring(0, 20) + "..." : product.alcoholType.label}/>
                </StyledBottleDataItem>
                <StyledBottleDataItem>
                    <LocalOffer/>
                    <ListItemText primary={product.appellation.name.length > 20 ? product.appellation.name.substring(0, 20) + "..." : product.appellation.name}/>
                </StyledBottleDataItem>
                <StyledBottleDataItem>
                    <Euro/>
                    <ListItemText primary={product.price + "€"}/>
                </StyledBottleDataItem>
            </List>
        </StyledBottleDataClass>
    )
}

export const StyledBottleDataClass = styled(List)
(({theme}) => ({
    position: 'absolute',
    transform: 'translateY(-50%)',
    width: '100%',
    top: '50%',
    left: 0,
}));

export const StyledBottleDataItem = styled(ListItem)
(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '5px 0 5px 20px',
    margin: 0,
    '& > *': {
        color: '#d5d4d4',
        margin: '0 4px 0 4px'
    }
}));

const StyledImgSliderCard = styled("div")
(({theme, active}) => ({
    width: 50,
    height: 50,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: active ? '2px solid #fff' : 'none',
    cursor: 'pointer',
    '& > img': {
        width: 'auto',
        height: '90%',
        objectFit: 'cover',
        borderRadius: 5,
    }
}));

export const StyledLittleBar = styled('div')
(({theme}) => ({
    position: 'relative',
    width: '100%',
    height: 50,
}));

export const StyledDataContainer = styled(Box)
(({theme}) => ({
    width: '100%',
    height: '100vh',
    boxShadow: theme.breakpoints.down('lg') ? 'inset 50px 0px 33px -30px rgba(0,0,0,0.40)' : 'inset 0px 50px 33px -30px rgba(0,0,0,0.22)',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: 0,
    },
}));

export const StyledContainerDesc = styled(Box)
(({theme}) => ({
    width: '100%',
    height: '100vh',
    position: 'relative',
    padding: 80,
}));

export const StyledContainerComments = styled(Box)
(({theme}) => ({
    width: '100%',
    minHeight: '20vh',
    position: 'relative',
    padding: 80,
}));

export const StyledButtonRow = styled(Box)
(({theme}) => ({
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: '80px 120px',
}));

export const StyledButton = styled(Button)
(({theme}) => ({
    width: 200,
    height: 50,
    borderRadius: 25,
    color: '#fff',
}));



