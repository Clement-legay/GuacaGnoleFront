import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminLayout from '../Components/Admin/AdminLayout/AdminLayout';
import CustomerLayout from "../Components/Customer/CustomerLayout/CustomerLayout";

import DashBoard from "../Components/Admin/DashBoard/DashBoard";

const PathRoutes = () => {
    const adminRoutes = () => (
        <AdminLayout>
            <Routes>
                <Route path="/dashboard" element={<DashBoard/>}/>
            </Routes>
        </AdminLayout>
    )

    const userRoutes = () => (
        <CustomerLayout>
            <Routes>
                <Route exact path="/" component={DashBoard} />
            </Routes>
        </CustomerLayout>
    )

    return (
        <Routes>
            <Route path="/*" element={userRoutes()}/>
            <Route path="/admin/*" element={adminRoutes()}/>
        </Routes>
    )};

export default PathRoutes;