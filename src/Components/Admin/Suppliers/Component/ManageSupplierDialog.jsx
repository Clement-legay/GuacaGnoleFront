import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
} from "@mui/material";
import {Formik} from "formik";
import * as Yup from "yup";
import {LoadingButton} from "@mui/lab";
import {useContext, useEffect, useState} from "react";
import {MainContext} from "../../../../Context/MainContext";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    postalCode: Yup.string().required("Postal code is required"),
    siret: Yup.string().required("Siret is required"),
});

const ManageSupplierDialog = ({setRefresh, addRequest, setAddRequest, setEditRequest, item}) => {
    const { postSupplier, putSupplier } = useContext(MainContext)
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: "",
        city: "",
        street: "",
        postalCode: "",
        siret: ""
    });

    const handleFormSubmit = async (values) => {
        setLoading(true);
        const newItem = {
            name: values.name,
            city: values.city,
            street: values.street,
            postalCode: values.postalCode,
            siret: values.siret
        };

        try {
            if (type === "create") {
                await postSupplier(newItem);
            } else {
                await putSupplier(item.id, newItem);
            }

            setRefresh(true);
            setLoading(false);
            handleClose();
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    };

    const handleClose = () => {
        setEditRequest(null);
        setAddRequest(false);
        setOpen(false);
    };

    useEffect(() => {
        if (addRequest) {
            setType("create");
            setOpen(true);
        } else if (item) {
            setType("edit");
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [addRequest, item]);

    useEffect(() => {
        if (item) {
            setInitialValues({
                name: item.name,
                city: item.city,
                street: item.street,
                postalCode: item.postalCode,
                siret: item.siret
            });
        } else {
            setInitialValues({
                name: "",
                city: "",
                street: "",
                postalCode: "",
                siret: ""
            });
        }
    }, [item]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {type === "create" ? "Create Supplier" : "Edit Supplier"}
            </DialogTitle>

            <DialogContent>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2} p={1} alignItems="center" justifyContent="center">
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        name="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.city && Boolean(errors.city)}
                                        helperText={touched.city && errors.city}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Street"
                                        name="street"
                                        value={values.street}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.street && Boolean(errors.street)}
                                        helperText={touched.street && errors.street}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Postal Code"
                                        name="postalCode"
                                        value={values.postalCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.postalCode && Boolean(errors.postalCode)}
                                        helperText={touched.postalCode && errors.postalCode}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Siret"
                                        name="siret"
                                        value={values.siret}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.siret && Boolean(errors.siret)}
                                        helperText={touched.siret && errors.siret}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={loading}
                                    >
                                        Validate
                                    </LoadingButton>
                                </Grid>

                            </Grid>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default ManageSupplierDialog;