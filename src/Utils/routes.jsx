import React, {useContext, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import AdminLayout from '../Components/Admin/AdminLayout/AdminLayout';
import CustomerLayout from "../Components/Customer/CustomerLayout/CustomerLayout";
import DashBoard from "../Components/Admin/DashBoard/DashBoard";
import Suppliers from "../Components/Admin/Suppliers/Suppliers";
import Products from "../Components/Admin/Products/Products";
import Users from "../Components/Admin/Users/Users";
import {MainContext} from "../Context/MainContext";
import NotFound from "../Components/Sessions/NotFound";
import LoginForm from "../Components/Sessions/LoginForm";
import RegisterForm from "../Components/Sessions/RegisterForm";
import {CircularProgress, CssBaseline} from "@mui/material";
import SessionLayout from "../Components/Sessions/SessionLayout";
import ForgotPassword from "../Components/Sessions/ForgotPassword";
import Home from "../Components/Customer/Home/Home";
import Offers from "../Components/Admin/Offers/Offers";
import {Box} from "@mui/system";
import Search from "../Components/Customer/Search/Search";
import Command from "../Components/Sessions/Command/Command";

const PathRoutes = () => {
    const { isAuth, canAdmin, postToken, setUser, refreshToken, fetchCurrentUser, token, setAuthUser, user, refreshCart, removeToken } = useContext(MainContext)
    const loading = token === undefined || (token && !user)
    // const navigate = useNavigate();

    useEffect(() => {
        if (isAuth() && loading) {
            refreshCart()
            if (token) {
                console.log(token);
                (async () => {
                    try {
                        const user = await fetchCurrentUser()
                        if (user) {
                            setUser(user)
                        } else {
                            removeToken()
                        }
                    } catch (error) {
                        console.error("Une erreur s'est produite lors de la récupération des informations de l'utilisateur: ", error);
                    }
                })();
            } else if (refreshToken) {
                (async () => {
                    try {
                        const data = {
                            refreshToken: refreshToken
                        }
                        const result = await postToken(data)
                        if (result) {
                            setAuthUser(result.data, true)
                        } else {
                            removeToken(true)
                        }
                    } catch (error) {
                        console.error("Une erreur s'est produite lors de la récupération du jeton de rafraîchissement: ", error);
                        // Gérer l'erreur ici
                    }
                })();
            }
        }
    }, [isAuth, loading, token, refreshToken, postToken, setAuthUser, setUser, fetchCurrentUser, refreshCart, removeToken])

    const RedirectToLogin = () => {
        const navigate = useNavigate();

        useEffect(() => {
            navigate('/session/signin')
        }, [navigate])

        return null
    }

    const adminRoutes = () => {
        if (isAuth()) {
            if (canAdmin()) {
                return (
                    <AdminLayout>
                        <Routes>
                            <Route path="/" element={<DashBoard/>}/>
                            <Route path="/suppliers" element={<Suppliers/>}/>
                            <Route path="/products" element={<Products/>}/>
                            <Route path="/users" element={<Users/>}/>
                            <Route path="/offers" element={<Offers/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </AdminLayout>
                )
            }
        }
        return <NotFound/>
    };

    const userRoutes = () => (
        <CustomerLayout>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </CustomerLayout>
    )

    const cartRoutes = () => {
        if (isAuth()) {
            return (
                <Routes>
                    <Route path="/validation" element={<Command defineStep={0}/>}/>
                    <Route path="/delivery" element={<Command defineStep={1}/>}/>
                    <Route path="/payment" element={<Command defineStep={2}/>}/>
                    <Route path="/confirmation" element={<Command defineStep={3}/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            )
        } else {
            return (
                <Routes>
                    <Route path="*" element={<RedirectToLogin/>}/>
                </Routes>
            )
        }
    }

    const sessionRoutes = () => (
        <SessionLayout>
            <Routes>
                <Route path="/signin" element={<LoginForm />} />
                <Route path="/signup" element={<RegisterForm />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/account" element={<Home />} />
                <Route path="/cart/*" element={cartRoutes()} />
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </SessionLayout>
    )

    return loading ?
        (
            <Box sx={{ width: '100%', height: '98vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress  color="secondary" />
            </Box>
        ) : (
            <Routes>
                <Route path="/session/*" element={sessionRoutes()} />
                <Route path="/admin/*" element={adminRoutes()}/>
                <Route path="/*" element={userRoutes()} />
            </Routes>
        )
};

export default PathRoutes;