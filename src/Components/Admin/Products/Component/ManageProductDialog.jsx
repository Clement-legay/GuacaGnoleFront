import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
} from "@mui/material";
import {Formik} from "formik";
import * as Yup from "yup";
import {AsynchronousAutocomplete} from "../../PagePart/AsynchronousAutocomplete";
import {LoadingButton} from "@mui/lab";
import {useContext, useEffect, useState} from "react";
import {MainContext} from "../../../../Context/MainContext";
import ImageField from "../../PagePart/ImageField";


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    imageUrl: Yup.string().required("Image is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
    millesime: Yup.number().required("Millesime is required"),
    alcoholDegree: Yup.number().required("Alcohol degree is required"),
    reference: Yup.string().required("Reference is required"),
});

const ManageProductDialog = ({setRefresh, addRequest, setAddRequest, setEditRequest, item}) => {
    const { postProduct, putProduct } = useContext(MainContext)
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: "",
        imageUrl: "",
        price: "",
        stock: "",
        millesime: "",
        alcoholDegree: "",
        reference: "",
    });

    const handleFormSubmit = async (values) => {
        setLoading(true)
        console.log(values)

        const newItem = {
            name: values.name,
            imageUrl: values.imageUrl,
            price: values.price,
            stock: values.stock,
            millesime: values.millesime,
            alcoholDegree: values.alcoholDegree,
            reference: values.reference,
            furnisherId: values.supplier.id,
            domainId: values.domain.id,
            alcoholTypeId: values.alcoholType.id,
            appellationId: values.appellation.id,
            regionId: values.region.id,
        };
        console.log(newItem);
        try {
            if (type === "create") {
                await postProduct(newItem);
            } else {
                await putProduct(item.id, newItem);
            }

            setRefresh(true);
            setLoading(false);
            handleClose();
        } catch (e) {
            setLoading(false);
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
                name: item.name || "",
                imageUrl: item.imageUrl || "",
                price: item.price || "",
                stock: item.stock || "",
                millesime: item.millesime || "",
                alcoholDegree: item.alcoholDegree || "",
                reference: item.reference || "",
                supplier: {
                    id: item.furnisherId,
                },
                domain: {
                    id: item.domainId,
                },
                alcoholType: {
                    id: item.alcoholTypeId,
                },
                appellation: {
                    id: item.appellationId,
                },
                region: {
                    id: item.regionId,
                },
            });
        } else {
            setInitialValues({
                name: "",
                imageUrl: "",
                price: "",
                stock: "",
                millesime: "",
                alcoholDegree: "",
                reference: "",
            });
        }
    }, [item]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {type === "create" ? "Create Product" : "Edit Product"}
            </DialogTitle>

            <DialogContent>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
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
                                    <ImageField setFieldValue={setFieldValue} FieldValue={"imageUrl"} initialValue={values.imageUrl} alt={values.name} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        name="price"
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.price && Boolean(errors.price)}
                                        helperText={touched.price && errors.price}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Stock"
                                        name="stock"
                                        value={values.stock}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.stock && Boolean(errors.stock)}
                                        helperText={touched.stock && errors.stock}
                                    />
                                </Grid>
                                <Grid item xs={8} lg={6}>
                                    <TextField
                                        fullWidth
                                        label="Millesime"
                                        name="millesime"
                                        value={values.millesime}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.millesime && Boolean(errors.millesime)}
                                        helperText={touched.millesime && errors.millesime}
                                    />
                                </Grid>
                                <Grid item xs={4} lg={6}>
                                    <TextField
                                        fullWidth
                                        label="Alcohol degree"
                                        name="alcoholDegree"
                                        value={values.alcoholDegree}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.alcoholDegree && Boolean(errors.alcoholDegree)}
                                        helperText={touched.alcoholDegree && errors.alcoholDegree}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        label="Reference"
                                        name="reference"
                                        value={values.reference}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.reference && Boolean(errors.reference)}
                                        helperText={touched.reference && errors.reference}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <AsynchronousAutocomplete
                                        value={values.supplier}
                                        setValue={setFieldValue}
                                        name="supplier"
                                        fetchString={"fetchSuppliers"}
                                        fetchStringById={"fetchSupplierById"}
                                        inputLabel={"Supplier"}
                                        optionLabel={"name"}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <AsynchronousAutocomplete
                                        value={values.region}
                                        setValue={setFieldValue}
                                        name="region"
                                        fetchString={"fetchRegions"}
                                        fetchStringById={"fetchRegionById"}
                                        inputLabel={"Region"}
                                        optionLabel={"name"}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <AsynchronousAutocomplete
                                        value={values.domain}
                                        setValue={setFieldValue}
                                        name="domain"
                                        fetchString={"fetchDomains"}
                                        fetchStringById={"fetchDomainById"}
                                        inputLabel={"Domain"}
                                        optionLabel={"name"}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <AsynchronousAutocomplete
                                        value={values.alcoholType}
                                        setValue={setFieldValue}
                                        name="alcoholType"
                                        fetchString={"fetchAlcoholTypes"}
                                        fetchStringById={"fetchAlcoholTypeById"}
                                        inputLabel={"Alcohol type"}
                                        optionLabel={"label"}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <AsynchronousAutocomplete
                                        value={values.appellation}
                                        setValue={setFieldValue}
                                        name="appellation"
                                        fetchString={"fetchAppellations"}
                                        fetchStringById={"fetchAppellationById"}
                                        inputLabel={"Appellation"}
                                        optionLabel={"name"}
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

export default ManageProductDialog;