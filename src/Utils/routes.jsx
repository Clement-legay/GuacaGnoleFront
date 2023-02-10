import React, {useContext} from 'react';
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
import {CssBaseline} from "@mui/material";
import SessionLayout from "../Components/Sessions/SessionLayout";
import ForgotPassword from "../Components/Sessions/ForgotPassword";

const PathRoutes = () => {
    const { isAuth, canAdmin } = useContext(MainContext)

    const adminRoutes = () => {
        if (!isAuth()) {
            if (!canAdmin()) {
                return (
                    <AdminLayout>
                        <Routes>
                            <Route path="/" element={<DashBoard />} />
                            <Route path="/suppliers" element={<Suppliers />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="*" element={<NotFound />}/>
                        </Routes>
                    </AdminLayout>
                )
            } else {
                return null
            }
        } else {
            return null
        }
    };

    const userRoutes = () => (
        <CustomerLayout>
            <Routes>
                <Route path="/" component={DashBoard} />
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </CustomerLayout>
    )

    const sessionRoutes = () => (
        <SessionLayout>
            <CssBaseline />
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </SessionLayout>
    )


    return (
        <Routes>
            <Route path="/session/*" element={sessionRoutes()} />
            <Route path="/admin/*" element={adminRoutes()}/>
            <Route path="/*" element={userRoutes()}/>
        </Routes>
    )};

export default PathRoutes;