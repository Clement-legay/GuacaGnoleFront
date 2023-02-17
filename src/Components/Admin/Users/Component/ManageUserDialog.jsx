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
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phone: Yup.string().required('Phone is required'),
});

const ManageUserDialog = ({setRefresh, addRequest, setAddRequest, setEditRequest, item}) => {
    const { postRegister, putUser } = useContext(MainContext)
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
    });

    const handleFormSubmit = async (values) => {
        setLoading(true);
        const newItem = {
            username: values.username,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            password: "password",
            confirmPassword: "password",
        };

        try {
            if (type === "create") {
                await postRegister(newItem);
            } else {
                await putUser(item.id, newItem);
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
                username: item.username,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                phone: item.phone,
            });
        } else {
            setInitialValues({
                username: '',
                email: '',
                firstName: '',
                lastName: '',
                phone: '',
            });
        }
    }, [item]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {type === "create" ? "Create User" : "Edit Edit"} (default password is "password")
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
                                        label="First Name"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.firstName && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.username && Boolean(errors.username)}
                                        helperText={touched.username && errors.username}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.phone && Boolean(errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
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

export default ManageUserDialog;