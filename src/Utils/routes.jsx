import React, {useContext, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';

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
    const { isAuth, canAdmin, postToken, setUser, refreshToken, fetchUserById, userId, token, setAuthUser, user, refreshCart } = useContext(MainContext)
    const loading = token === undefined || (token && !user)
    // const navigate = useNavigate();

    useEffect(() => {
        if (isAuth() && loading) {
            refreshCart()
            if (token) {
                (async () => {
                    try {
                        const user = await fetchUserById(userId)
                        setUser(user)
                    } catch (e) {
                        console.log('failed but faked')
                        setUser({
                            id: 1,
                            username: "Savoldetour",
                            firstName: "Clément",
                            lastName: "Legay",
                            role: 1,
                            city: null,
                            streetName: null,
                            postalCode: null
                        })
                    }
                })()
            } else if (refreshToken) {
                (async () => {
                    try {
                        const result = await postToken(refreshToken)
                        setAuthUser(result, true)

                        try {
                            const user = await fetchUserById(result.id)
                            setUser(user)
                        } catch (e) {
                            console.log('failed', e)
                        }
                    } catch (e) {
                        console.log("failed", e)
                        setAuthUser(null, true)

                    }
                })()
            }
        }
    }, [isAuth, loading, userId, token, refreshToken, postToken, setAuthUser, setUser, fetchUserById, refreshCart])

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

    const cartRoutes = () => (
        <Routes>
            <Route path="/validation" element={<Command defineStep={0}/>} />
            <Route path="/delivery" element={<Command defineStep={1}/>} />
            <Route path="/payment" element={<Command defineStep={2}/>} />
            <Route path="/confirmation" element={<Command defineStep={3}/>} />
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )

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