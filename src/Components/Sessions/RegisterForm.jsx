import { LoadingButton } from '@mui/lab';
import {Card, Checkbox, Grid, TextField, Typography} from '@mui/material';
import { Formik } from 'formik';
import {useContext, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {MainContext} from "../../Context/MainContext";
import {RegisterForm, FlexBox} from "../../Styles/Sessions/AuthForms";

// form field validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be 6 character length')
        .required('Password is required!'),
    email: Yup.string().email('Invalid Email address').required('Email is required!'),
    firstName: Yup.string().required('First name is required!'),
    lastName: Yup.string().required('Last name is required!'),
    phone: Yup.string().required('Phone number is required!'),
    username: Yup.string().required('Username is required!'),
});

const JwtRegister = () => {
    const { postRegister } = useContext(MainContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (values) => {
        setLoading(true);

        try {
            const result = await postRegister({
                email: values.email, username: values.username,
                password: values.password, confirmPassword: values.confirmPassword,
                firstName: values.firstName, lastName: values.lastName,
                phone: values.phone
            });
            console.log(result);
            if (result.status === 201) {
                navigate('/session/signin');
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    return (
        <RegisterForm>
            <Card className="card">

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        email: '',
                        username: '',
                        password: '',
                        confirmPassword: '',
                        firstName: '',
                        lastName: '',
                        phone: '',
                    }}
                    validationSchema={validationSchema}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container alignContent={'center'} justifyContent={'center'} spacing={2} p={4}>
                                    <Grid item sm={6} xs={6}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="text"
                                            name="username"
                                            label="Username"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.username}
                                            onChange={handleChange}
                                            helperText={touched.username && errors.username}
                                            error={Boolean(errors.username && touched.username)}
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="text"
                                            name="firstName"
                                            label="First Name"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.firstName}
                                            helperText={touched.firstName && errors.firstName}
                                            error={Boolean(errors.firstName && touched.firstName)}
                                            sx={{ mb: 2 }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            name="lastName"
                                            size="small"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.lastName}
                                            variant="outlined"
                                            helperText={touched.lastName && errors.lastName}
                                            error={Boolean(errors.lastName && touched.lastName)}
                                            sx={{ mb: 2 }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            name="phone"
                                            size="small"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phone}
                                            variant="outlined"
                                            helperText={touched.phone && errors.phone}
                                            error={Boolean(errors.phone && touched.phone)}
                                            sx={{ mb: 2 }}
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={6}>

                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="email"
                                            name="email"
                                            label="Email"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.email}
                                            onChange={handleChange}
                                            helperText={touched.email && errors.email}
                                            error={Boolean(errors.email && touched.email)}
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.password}
                                            onChange={handleChange}
                                            helperText={touched.password && errors.password}
                                            error={Boolean(errors.password && touched.password)}
                                            sx={{ mb: 2 }}
                                        />

                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="confirmPassword"
                                            type="password"
                                            label="Confirm Password"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            helperText={touched.confirmPassword && errors.confirmPassword}
                                            error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                                            sx={{ mb: 2 }}
                                        />

                                        <FlexBox gap={2} alignItems="center" sx={{mt:1}}>
                                            <Checkbox
                                                size="small"
                                                name="remember"
                                                sx={{ padding: 0 }}
                                            />

                                            <Typography fontSize={13}>
                                                I have read and agree to the terms of service.
                                            </Typography>
                                        </FlexBox>
                                    </Grid>
                                    <Grid item sm={4} xs={12}>
                                        <LoadingButton
                                            type="submit"
                                            color="primary"
                                            loading={loading}
                                            variant="contained"
                                            sx={{ mb: 2, mt: 3, width: '100%' }}
                                        >
                                            Register
                                        </LoadingButton>

                                        <Typography>
                                            Already have an account?
                                            <NavLink
                                                to="/session/signin"
                                                style={{
                                                    color: "#fff",
                                                    marginLeft: 5
                                                }}>
                                                Login
                                            </NavLink>
                                        </Typography>
                                    </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Card>
        </RegisterForm>
    );
};

export default JwtRegister;
