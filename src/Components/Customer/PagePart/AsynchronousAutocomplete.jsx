import {useEffect, useState, Fragment, useContext} from "react";
import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import {MainContext} from "../../../Context/MainContext";

export const AsynchronousAutocomplete = ({setValue, value, optionLabel, inputLabel, fetchString, sx, name}) => {
    const fetch = useContext(MainContext)[fetchString];
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loadingPanel = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loadingPanel) {
            return undefined;
        }

        (async () => {
            const result = await fetch(true)

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

    return (
        <Autocomplete
            sx={sx}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}

            value={value}
            onChange={(event, newValue) => {
                setValue(name, newValue)
            }}

            options={options}

            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option ? option[optionLabel] : ""}

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
    )
}