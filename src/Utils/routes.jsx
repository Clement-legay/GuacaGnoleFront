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

const PathRoutes = () => {
    const { isAuth, canAdmin, postToken, token, setAuthUser, user, refreshCart } = useContext(MainContext)
    const loading = token === undefined || (token && !user)
    // const navigate = useNavigate();

    useEffect(() => {
        if (isAuth() === undefined) {
            refreshCart()
            if (token) {
                try {
                    const result = postToken(token)
                    setAuthUser(result);
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }, [isAuth, token, postToken, setAuthUser, refreshCart])

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

    const sessionRoutes = () => (
        <SessionLayout>
            <Routes>
                <Route path="/signin" element={<LoginForm />} />
                <Route path="/signup" element={<RegisterForm />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/account" element={<Home />} />
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </SessionLayout>
    )

    return loading ?
        (
            <Box sx={{ width: '100%', height: '98vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
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