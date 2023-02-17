import {useEffect, useState, Fragment, useContext} from "react";
import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import {MainContext} from "../../../Context/MainContext";

export const AsynchronousAutocomplete = ({setValue, value, optionLabel, inputLabel, name, fetchString, fetchStringById}) => {
    const fetch = useContext(MainContext)[fetchString];
    const fetchById = useContext(MainContext)[fetchStringById];
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const loadingPanel = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loadingPanel) {
            return undefined;
        }

        (async () => {
            const result = await fetch()

            if (active) {
                setOptions(result);
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingPanel, fetch]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        if (!loaded) {
            if (value) {
                (async () => {
                    const result = await fetchById(value.id)
                    setValue(name, result)
                    setLoaded(true)
                })()
            } else {
                setLoaded(true);
            }
        }
    }, [loaded, fetchById, setValue, value, name])

    return loaded ? (
        <Autocomplete
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}

            value={value}
            onChange={(event, newValue) => {
                setValue(name, newValue);
            }}

            options={options}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option[optionLabel]}

            loading={loadingPanel}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={inputLabel}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loadingPanel ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                />
            )}
        />
    ) : <TextField label={inputLabel} disabled/>
}