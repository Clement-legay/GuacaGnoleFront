import {
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle, FormControlLabel, FormLabel,
    Grid,
    TextField,
} from "@mui/material";
import {Formik} from "formik";
import * as Yup from "yup";
// import {AsynchronousAutocomplete} from "./AsynchronousAutocomplete";
import {LoadingButton} from "@mui/lab";
import {useContext, useEffect, useState} from "react";
import {MainContext} from "../../../../Context/MainContext";
import ImageField from "../../PagePart/ImageField";


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    imageUrl: Yup.string().required("Image is required"),
    deadline: Yup.date().required("Deadline is required"),
    isB2B: Yup.boolean().required("Is B2B is required"),
    isDraft: Yup.boolean().required("Is Draft is required"),
});

const ManageInvoiceDialog = ({setRefresh, addRequest, setAddRequest, setEditRequest, item}) => {
    const { postOffer, putOffer } = useContext(MainContext)
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        deadline: "",
        isB2B: false,
        isDraft: false,
        productOffers: []
    });

    const handleFormSubmit = async (values) => {
        setLoading(true);
        const newItem = {
            name: values.name,
            description: values.description,
            price: values.price,
            imageUrl: values.imageUrl,
            deadline: values.deadline,
            isB2B: values.isB2B,
            isDraft: values.isDraft,
            productOffersRegister: values.productOffers.map((item) => {
                return {
                    productId: item.productId,
                    quantityProduct: item.quantityProduct
                }
            })
        };
        console.log(newItem);

        try {
            if (type === "create") {
                await postOffer(newItem);
            } else {
                await putOffer(item.id, newItem);
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
                    name: item.name || "",
                    description: item.description || "",
                    price: item.price || "",
                    imageUrl: item.imageUrl || "",
                    deadline: item.deadline ? item.deadline.split("T")[0] : "",
                    isB2B: item.isB2B || false,
                    isDraft: item.isDraft || false,
                    productOffers: [
                        ...item.productOffers.map(
                            (item) => ({
                                product: item.product,
                                productId: item.productId,
                                quantityProduct: item.quantityProduct,
                            })),
                    ]
                }
            );
        } else {
            setInitialValues({
                name: "",
                description: "",
                price: "",
                imageUrl: "",
                deadline: "",
                isB2B: false,
                isDraft: false,
                productOffers: []
            });
        }
    }, [item]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {type === "create" ? "Create Offer" : "Edit Offer"}
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
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="Name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        id="price"
                                        name="price"
                                        label="Price"
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.price && Boolean(errors.price)}
                                        helperText={touched.price && errors.price}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="description"
                                        name="description"
                                        label="Description"
                                        type="text"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.description && Boolean(errors.description)}
                                        helperText={touched.description && errors.description}
                                        rows={4}
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="deadline"
                                        name="deadline"
                                        label="Deadline"
                                        type="date"
                                        value={values.deadline}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.deadline && Boolean(errors.deadline)}
                                        helperText={touched.deadline && errors.deadline}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.isB2B}
                                                onChange={handleChange}
                                                name="isB2B"
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <FormLabel component="legend">Is B2B</FormLabel>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.isDraft}
                                                onChange={handleChange}
                                                name="isDraft"
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <FormLabel component="legend">Is Draft</FormLabel>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ImageField FieldValue={"imageUrl"} setFieldValue={setFieldValue} alt={values.name} initialValue={values.imageUrl}/>
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <AsynchronousAutocomplete
                                        props={{
                                            multiple: true,
                                            label: "Products",
                                            name: "products",

                                            value: values.productOffers,

                                            onChange: (e, value) => {
                                                if (e === 'delete') {
                                                    setFieldValue('productOffers', value)
                                                } else {
                                                    const newValue = value.pop();
                                                    setFieldValue("productOffers", [...values.productOffers, {
                                                        product: newValue,
                                                        productId: newValue.id,
                                                        quantityProduct: 1
                                                    }]);
                                                }
                                            },
                                        }}
                                        fetchString={"fetchProducts"}
                                        onChangeQuantity={(e, item) => {
                                            if (e === "add") {
                                                item.quantityProduct++;
                                            } else {
                                                item.quantityProduct--;
                                            }

                                            setFieldValue("productOffers", values.productOffers);
                                        }}
                                    /> */}
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

export default ManageInvoiceDialog;