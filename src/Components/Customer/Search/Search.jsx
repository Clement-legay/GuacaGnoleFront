import {
    Button,
    CardContent,
    Typography,
    Grid,
    CardActionArea,
    CardActions
} from '@mui/material';
import {useContext, useEffect, useState} from "react";
import {MainContext} from "../../../Context/MainContext";
import {
    ProductCard,
    ProductImage,
    SearchBox,
    SearchInput
} from "../../../Styles/Customer/Search/Search";
import {Box, Container} from "@mui/system";

const Search = () => {
    const { setRouteName } = useContext(MainContext);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setRouteName("Search");
    }, [setRouteName]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(search);
    }

    return (
        <Box>
            <Container maxWidth="lg" sx={{ marginTop: '3rem' }}>
                <SearchBox>
                    <Grid container spacing={2}  alignItems="center"  justifyContent="center">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
                                    Search
                                </Typography>
                                <SearchInput
                                    placeholder="Search for products"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                        </Grid>
                    </Grid>
                </SearchBox>
                <Typography variant="h4" gutterBottom>
                    Produits en vedette
                </Typography>
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <ProductCard>
                                <CardActionArea>
                                    <ProductImage
                                        component="img"
                                        image={product.image}
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ maxHeight: '5rem', overflow: 'hidden' }}
                                        >
                                            {product.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Typography variant="h6">${product.price}</Typography>
                                </CardActions>
                            </ProductCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Search;

const products = [
    {
        id: 1,
        name: 'Produit 1',
        image: 'https://picsum.photos/345/140',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        price: 29.99,
    },
    {
        id: 2,
        name: 'Produit 2',
        image: 'https://picsum.photos/345/140',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        price: 29.99,
    },
    {
        id: 3,
        name: 'Produit 3',
        image: 'https://picsum.photos/345/140',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        price: 29.99,
    },
    {
        id: 4,
        name: 'Produit 4',
        image: 'https://picsum.photos/345/140',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        price: 29.99,
    },
    {
        id: 5,
        name: 'Produit 5',
        image: 'https://picsum.photos/345/140',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        price: 29.99,
    },
    {
        id: 6,
        name: 'Produit 6',
        image: 'https://picsum.photos/345/140',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        price: 29.99,
    },
    {
        id: 7,
        name: 'Produit 7',
        image: 'https://picsum.photos/345/140',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        price: 29.99,
    }
];