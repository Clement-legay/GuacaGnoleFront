import {useEffect, useState, Fragment, useContext} from "react";
import {Autocomplete, Box, Button, Card, Chip, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import {MainContext} from "../../../Context/MainContext";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from "@mui/icons-material/Add";

export const AsynchronousAutocomplete = ({fetchString, props, onChangeQuantity}) => {
    const fetch = useContext(MainContext)[fetchString];
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch();
            if (active) {
                setOptions(response);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, setOptions, fetch]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            {...props}

            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}

            options={options}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}

            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Products"
                    placeholder="Products"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            props.value.map((option) => (
                                    <Box key={option.productId} sx={{ width: 150, minHeight: 100, alignItems: 'center', justifyContent: 'center' }}>
                                        <Chip
                                            label={option.product.name}
                                            sx={{
                                                width: '100%',
                                            }}
                                            onDelete={() => props.onChange('delete', props.value.filter((v) => v.id !== option.productId))}
                                        />

                                        <Card
                                            label={option.product.name}
                                            sx={{
                                                width: '100%',
                                                borderRadius: 5,
                                                mt: 1,
                                                height: 125,
                                            }}
                                        >
                                            <Grid container alignItems="center" justifyContent="center">
                                                <Grid item>
                                                    <img src={option.product.image} alt={option.product.name} width="100%" />
                                                </Grid>
                                            </Grid>
                                            <Grid container alignItems="center" justifyContent="center">
                                                <Grid item>
                                                    <Button onClick={() => onChangeQuantity('remove', option)} disabled={option.quantityProduct === 1}>
                                                        <RemoveIcon />
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1">{option.quantityProduct}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Button onClick={() => onChangeQuantity('add', option)}>
                                                        <AddIcon />
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Box>
                                ))
                        ),

                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                />
            )}
        />
    );
};