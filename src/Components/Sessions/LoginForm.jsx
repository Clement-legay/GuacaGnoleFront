import { LoadingButton } from '@mui/lab';
import {Card, Checkbox, Grid, TextField, Typography} from '@mui/material';
import {useContext, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {MainContext} from "../../Context/MainContext";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {ContentBox, Root, JustifyBox, FlexBox} from "../../Styles/Sessions/AuthForms";



// form field validation schema
const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, 'Username must be 4 character length')
        .required('Username is required!'),
    password: Yup.string()
        .min(4, 'Password must be 4 character length')
        .required('Password is required!'),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const  [errorMsg, setErrorMsg]  = useState('');
    const { postLogin, setAuthUser } = useContext(MainContext)

    const handleFormSubmit = async (values) => {
        setLoading(true);
        try {
            const result = await postLogin({username: values.username, password: values.password});

            if (result.status === 200) {
                setAuthUser(result.data, values.remember);
                navigate('/');
            }
            setLoading(false)
        } catch (e) {
            setErrorMsg("Invalid username or password");
            setLoading(false);
        }
    };

    return (
        <Root>
            <Card className="card">
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
                            <img src="/assets/img/illustrations/dreamer.svg" width="100%" alt="" />
                        </JustifyBox>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <ContentBox>
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={{
                                    username: '',
                                    password: '',
                                    remember: false,
                                }}
                                validationSchema={validationSchema}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="username"
                                            name="username"
                                            label="Username"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.username}
                                            onChange={handleChange}
                                            helperText={touched.username && errors.username}
                                            error={Boolean(errors.username && touched.username)}
                                            sx={{ mb: 3 }}
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
                                            sx={{ mb: 1.5 }}
                                        />

                                        <FlexBox justifyContent="space-between">
                                            <FlexBox gap={1}>
                                                <Checkbox
                                                    size="small"
                                                    name="remember"
                                                    onChange={handleChange}
                                                    checked={values.remember}
                                                    sx={{ padding: 0 }}
                                                />

                                                <Typography variant="body2" color="text.secondary">
                                                    Remember me
                                                </Typography>
                                            </FlexBox>

                                            <NavLink
                                                to="/session/forgot-password"
                                                style={{
                                                   color: "#dedede",
                                                }}
                                            >
                                                Forgot password?
                                            </NavLink>
                                        </FlexBox>

                                        <Grid container spacing={2} sx={{ my: 2 }} alignContent={'center'} justifyContent={'start'}>
                                            <Grid item xs={12} lg={4}>
                                                <LoadingButton
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    loading={loading}
                                                >
                                                    Login
                                                </LoadingButton>
                                            </Grid>

                                            <Grid item xs={12} lg={8}>
                                                <Typography variant="body2" color="red" sx={{ mt: 1 }}>
                                                    {errorMsg}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Typography>
                                            Don't have an account?
                                            <NavLink
                                                to="/session/signup"
                                                style={{
                                                    color: "#dedede",
                                                    marginLeft: 5
                                                }}
                                            >
                                                Register
                                            </NavLink>
                                        </Typography>
                                    </form>
                                )}
                            </Formik>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </Root>
    );
};

export default LoginForm;
