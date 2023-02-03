import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminLayout from './Layout/AdminLayout/AdminLayout';
import CustomerLayout from "./Layout/CustomerLayout/CustomerLayout";

import DashBoard from "./DashBoard/DashBoard";

const PathRoutes = () => {
    const adminRoutes = () => (
        <AdminLayout>
            <Routes>
                <Route exact path="/admin" component={DashBoard} />
                <Route path="/admin/dashboard" element={<DashBoard/>}/>
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
            <Route path="/admin" element={adminRoutes()}/>
            <Route path="/" element={userRoutes()}/>
        </Routes>
    )};

export default PathRoutes;