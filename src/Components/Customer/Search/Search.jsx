import {
    Typography,
    Grid,
    Slider, TextField
} from '@mui/material';
import {useContext, useEffect, useState} from "react";
import {MainContext} from "../../../Context/MainContext";
import {
    FilterContainer,
    IconContainer, ImgLogo, ImgLogoBg,
    ProductCard,
    ProductImage,
    SearchBox,
    SearchInput
} from "../../../Styles/Customer/Search/Search";
import {Box, Container} from "@mui/system";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import LiquorIcon from '@mui/icons-material/Liquor';
import {AsynchronousAutocomplete} from "../PagePart/AsynchronousAutocomplete";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {StyledBigCard} from "../../../Styles/Customer/Home/Home";
import ProductDialog from "../ProductDialog/ProductDialog";
import {useLocation, useNavigate} from "react-router-dom";
const background = require("../../../Assets/img/backgrounds/searchBar.jpg");

// get the background image

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {setRouteName, offers, fetchOffers, manageFilters} = useContext(MainContext);
    const [finalArray, setFinalArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filter, setFilter] = useState({
        search: '',
        type: null,
        price: [0, 100],
        millesime: null,
        domain: null,
        region: null,
        appellation: null,
    });

    const handleSelection = (value) => {
        setSelectedProduct(value.id);
    }

    const filterFunction = (array, filterKey, filterValue) => {
        return array.filter((item) =>
            item.productOffers.some((productOffer) =>
                productOffer.product[filterKey] === filterValue)
        )
    }

    const isAvailable = (productList) => {
        let available = true;
        productList.forEach(product => {
            if (product.quantityProduct > product.product.stock) {
                available = false;
            }
        });
        return available;
    }

    const howManyStars = (comments, text=false) => {
        let sum = 0;
        let word;
        if (comments) {
            comments.forEach(comment => {
                sum += comment.rate;
            });
            const average = sum / comments.length;
            if (text) {
                if (comments.length === 0) {
                    return "Aucun avis"
                } else if (average < 1.5) {
                    word = "Mauvais"
                } else if (average < 2.5) {
                    word = "Médiocre"
                } else if (average < 3.5) {
                    word = "Moyen"
                } else if (average < 4.5) {
                    word = "Bon"
                } else {
                    word = "Excellent"
                }
            }
            return {
                average: average,
                textAverage: word + " (" + comments.length + " avis)"
            }
        } else {
            return {
                average: 0,
                textAverage: "Aucun avis"
            }
        }

    }

    const howManyBottles = (productList) => {
        let sum = 0;
        productList.forEach(product => {
            sum += product.quantityProduct;
        });
        return sum;
    }

    const setValue = (key, value) => {
        setFilter({...filter, [key]: value});
    }

    useEffect(() => {
        if (loading) {
            const refreshFilter = manageFilters();
            if (refreshFilter) {
                setFilter(refreshFilter);
            }
            fetchOffers(true);
            setLoading(false);
        }
    }, [loading, fetchOffers, manageFilters]);

    useEffect(() => {
        if (offers && loading === false) {
            // fetchOffers(true);
            manageFilters(filter);

            let array = offers;
            if (filter.search) {
                array = array.filter(offer => offer.name.toLowerCase().includes(filter.search.toLowerCase()));
            }
            if (filter.type) {
                array = filterFunction(array, "alcoholTypeId", filter.type.id);
            }
            if (filter.price) {
                array = array.filter(offer => offer.price >= filter.price[0] && offer.price <= filter.price[1]);
            }
            if (filter.millesime) {
                array = filterFunction(array, "millesime", Number(filter.millesime.format("YYYY")));
            }
            if (filter.domain) {
                array = filterFunction(array, "domainId", filter.domain.id);
            }
            if (filter.region) {
                array = filterFunction(array, "regionId", filter.region.id);
            }
            if (filter.appellation) {
                array = filterFunction(array, "appellationId", filter.appellation.id);
            }

            setFinalArray(array);
        }
    }, [offers, filter, manageFilters, loading, fetchOffers]);

    useEffect(() => {
        setRouteName("Search");

        const query = new URLSearchParams(location.search);
        const product = query.get('product');
        if (product) {
            setSelectedProduct(product);
        }
    }, [setRouteName, setSelectedProduct, location.search]);

    useEffect(() => {
        if (selectedProduct) {
            console.log(selectedProduct);
            setOpenDialog(true);
            const query = new URLSearchParams(location.search);
            query.set('product', selectedProduct);
            navigate({search: query.toString()}, {replace: true});
        } else {
            setOpenDialog(false);
            const query = new URLSearchParams(location.search);
            query.delete('product');
            navigate({search: query.toString()}, {replace: true});
        }
    }, [selectedProduct, setOpenDialog, location.search, navigate]);

    return (
        <Box>
            <ProductDialog open={openDialog} setOpen={setOpenDialog} selected={selectedProduct} setSelected={setSelectedProduct} />
            <SearchBox sx={{backgroundImage: `url(${background})`}}>
                <ImgLogoBg src={"/assets/img/blackWaxSeal.png"} alt={"logo"}/>
                <ImgLogo src={"/assets/img/GuacaGnoleLogo.png"} alt={"logo2"}/>
                <Container maxWidth="lg">
                    <FilterContainer>

                        <Grid container spacing={0} justifyContent={"center"} alignItems={"center"}>
                            <Grid item xs={12} sm={12} md={12} lg={12} sx={{mb:2}}>
                                <SearchInput
                                    placeholder="Search"
                                    value={filter.search}
                                    onChange={(e) => setValue('search', e.target.value)}
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '30px',
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: '30px',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item sx={{mx:1}}>
                                <AsynchronousAutocomplete
                                    sx={{
                                        width: 125,
                                        backgroundColor: 'white',
                                        borderRadius: '30px',
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: '30px',
                                        },
                                    }}
                                    fetchString={"fetchAlcoholTypes"}
                                    optionLabel={"label"}
                                    value={filter.type}
                                    setValue={setValue}
                                    name={"type"}
                                    inputLabel={"Type"}
                                />
                            </Grid>
                            <Grid item sx={{mx:1}}>
                                <AsynchronousAutocomplete
                                    sx={{
                                        width: 100,
                                        backgroundColor: 'white',
                                        borderRadius: '30px',
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: '30px',
                                        },
                                    }}
                                    fetchString={"fetchAppellations"}
                                    optionLabel={"name"}
                                    value={filter.appellation}
                                    setValue={setValue}
                                    name={"appellation"}
                                    inputLabel={"Appellation"}
                                />
                            </Grid>
                            <Grid item sx={{mx:1}}>
                                <AsynchronousAutocomplete
                                    sx={{
                                        width: 175,
                                        backgroundColor: 'white',
                                        borderRadius: '30px',
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: '30px',
                                        },
                                    }}
                                    fetchString={"fetchRegions"}
                                    optionLabel={"name"}
                                    value={filter.region}
                                    setValue={setValue}
                                    name={"region"}
                                    inputLabel={"Region"}
                                />
                            </Grid>
                            <Grid item sx={{mx:2}}>
                                <Slider
                                    value={filter.price}
                                    onChange={(e, value) => setValue('price', value)}
                                    aria-labelledby="range-slider"
                                    getAriaValueText={(value) => `${value}`}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={250}
                                    sx={{
                                        width: '200px'
                                    }}
                                />
                            </Grid>
                            <Grid item sx={{mx:1}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        views={['year']}
                                        label="Millésime"
                                        value={filter.millesime}
                                        onChange={(newValue) => {
                                            setValue('millesime', newValue);
                                        }}
                                        renderInput={(params) => <TextField
                                            {...params}
                                            helperText={null}
                                            sx={{
                                                width: 125,
                                                backgroundColor: 'white',
                                                borderRadius: '30px',
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: '30px',
                                                },
                                            }}
                                        />
                                        }/>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item sx={{mx:1}}>
                                <AsynchronousAutocomplete
                                    sx={{
                                        width: 200,
                                        backgroundColor: 'white',
                                        borderRadius: '30px',
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: '30px',
                                        },
                                    }}
                                    fetchString={"fetchDomains"}
                                    optionLabel={"name"}
                                    value={filter.domain}
                                    setValue={setValue}
                                    name={"domain"}
                                    inputLabel={"Domaine"}
                                />
                            </Grid>
                        </Grid>
                    </FilterContainer>
                </Container>
            </SearchBox>
            <StyledBigCard>
                <Container maxWidth="lg">


                    <Box sx={{ p: 1, display:'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Typography variant="h4" gutterBottom sx={{
                            fontSize: '1.6rem',
                            fontWeight: 800,
                            color: '#000',
                            textAlign: 'center',
                        }}>
                            {finalArray.length} résultats
                        </Typography>
                    </Box>
                    <Grid container spacing={3}>
                        {finalArray.map((offer) => {
                            const {textAverage, average} = howManyStars(offer.comments);
                            const available = isAvailable(offer.productOffers);
                            const howMany = howManyBottles(offer.productOffers);

                            return (
                                <Grid item xs={12} sm={6} md={4} lg={4} key={offer.id}>
                                    <ProductCard onClick={() => handleSelection(offer)}>
                                        <ProductImage
                                            component="img"
                                            image={offer.imageUrl}
                                            alt={offer.name}
                                        />
                                        <Grid container spacing={3}  alignItems="center"  justifyContent="center" sx={{mt:1}}>
                                            <Grid item>
                                                <IconContainer text={howMany > 1 ? `${howMany} bouteilles` : `${howMany} bouteille`}>
                                                    <LiquorIcon color={"text.primary"} />
                                                </IconContainer>
                                            </Grid>
                                            <Grid item>
                                                <IconContainer text={available  ? "Available" : "Out of stock"}>
                                                    <WarehouseIcon color={available ? "text.primary" : "disabled"} />
                                                </IconContainer>
                                            </Grid>
                                            <Grid item>
                                                <IconContainer text={textAverage}>
                                                    {average > 2.5 ? <StarIcon color="warning" /> : <StarOutlineOutlinedIcon color="warning" />}
                                                </IconContainer>
                                            </Grid>
                                        </Grid>
                                        <Box sx={{ p: 1, display:'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                            <Typography variant="h6" component="h6" sx={{ textAlign:'center', mt:0, fontWeight: 300 }}>
                                                {offer.name}
                                            </Typography>
                                            <Typography variant="h5" component="h6" sx={{ fontWeight: 'bold', mt:0 }}>
                                                {offer.price}€
                                            </Typography>
                                        </Box>
                                    </ProductCard>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </StyledBigCard>
        </Box>
    );
};

export default Search;