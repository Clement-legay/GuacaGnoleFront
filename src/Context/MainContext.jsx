import React, {createContext, useState} from 'react';
import {ProductEntity} from "./Entity/ProductEntity";
import {SupplierEntity} from "./Entity/SupplierEntity";
import {UserEntity} from "./Entity/UserEntity";

export const MainContext = createContext({
    themeStyle: "dark",
    theme: null,

    routeName: null,

    isAuth: false,
    token: null,
    user: null,
    role: null,

    products: [],
    suppliers: [],
    users: [],



    regions: [],
    // orders: [],
    ProductOffer: [],
    domains: [],
    appellations: [],
    alcoholTypes: [],
});

export const MainProvider = ({ children }) => {
    const [themeStyle, setThemeStyle] = useState();
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(null);
    const [routeName, setRouteName] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);

    const canAdmin = () => {
        return role === "admin";
    };

    const isAuth = () => {
        return token !== null;
    };

    const state = {
        theme, setTheme,
        user, setUser,
        themeStyle, setThemeStyle,
        routeName, setRouteName,
        token, setToken,
        role, setRole,
        isAuth, canAdmin,
        ...ProductEntity(),
        ...SupplierEntity(),
        ...UserEntity(),
    };

    return (
        <MainContext.Provider value={state}>
            {children}
        </MainContext.Provider>
    );
};

// const Region = {
//     regions: [],
//     fetchRegions: () => (
//         fetchAPI("Regions")
//     ),
//     fetchRegionById: (id) => (
//         fetchAPI(`Regions/${id}`)
//     ),
//     postRegion: (data) => (
//         postAPI("Regions", data)
//     ),
//     putRegion: (id, data) => (
//         putAPI(`Regions/${id}`, data)
//     ),
//     deleteRegion: (id) => (
//         deleteAPI(`Regions/${id}`)
//     )
// }
//

//
// const User = {
//
// }
//
// // const Order = {
// //     fetchOrders: () => (
// //         fetchAPI("Invoice")
// //     ),
// //     fetchOrderById: (id) => (
// //         fetchAPI(`Invoice/${id}`)
// //     ),
// //     postOrder: (data) => (
// //         postAPI("Invoice", data)
// //     ),
// //     putOrder: (id, data) => (
// //         putAPI(`Invoice/${id}`, data)
// //     ),
// //     deleteOrder: (id) => (
// //         deleteAPI(`Invoice/${id}`)
// //     ),
// //     postOrderProduct: (data) => (
// //         postAPI("Invoice/invoiceProduct", data)
// //     ),
// //     fetchOrderProduct: (id) => (
// //         fetchAPI(`Invoice/invoiceProduct/${id}`)
// //     ),
// //     getOrderPdf: (id) => (
// //         fetchAPI(`Invoice/GetInvoicePdf/${id}`)
// //     ),
// // }
//
// const ProductOffer = {
//     fetchProductOffers: () => (
//         fetchAPI("ProductOffer")
//     ),
//     fetchProductOfferById: (id) => (
//         fetchAPI(`ProductOffer/${id}`)
//     ),
// }
//
// const Domain = {
//     fetchDomains: () => (
//         fetchAPI("Domain")
//     ),
//     fetchDomainById: (id) => (
//         fetchAPI(`Domain/${id}`)
//     ),
//     fetchDomainByName: (name) => (
//         fetchAPI(`Domain/ByName/${name}`)
//     ),
//     postDomain: (data) => (
//         postAPI("Domain", data)
//     ),
//     putDomain: (id, data) => (
//         putAPI(`Domain/${id}`, data)
//     ),
//     deleteDomain: (id) => (
//         deleteAPI(`Domain/${id}`)
//     )
// }
//
// const Appellation = {
//     fetchAppellations: () => (
//         fetchAPI("Appellation")
//     ),
//     fetchAppellationById: (id) => (
//         fetchAPI(`Appellation/${id}`)
//     ),
//     fetchAppellationByName: (name) => (
//         fetchAPI(`Appellation/GetByName/${name}`)
//     ),
//     postAppellation: (data) => (
//         postAPI("Appellation", data)
//     ),
//     putAppellation: (id, data) => (
//         putAPI(`Appellation/${id}`, data)
//     ),
//     deleteAppellation: (id) => (
//         deleteAPI(`Appellation/${id}`)
//     )
// }
//
// const AlcoholType = {
//     fetchAlcoholTypes: () => (
//         fetchAPI("AlcoholControllerType")
//     ),
//     fetchAlcoholTypeById: (id) => (
//         fetchAPI(`AlcoholControllerType/${id}`)
//     ),
//     fetchAlcoholTypeByLabel: (label) => (
//         fetchAPI(`AlcoholControllerType/GetByLabel/${label}`)
//     ),
//     postAlcoholType: (data) => (
//         postAPI("AlcoholControllerType", data)
//     ),
//     putAlcoholType: (id, data) => (
//         putAPI(`AlcoholControllerType/${id}`, data)
//     ),
//     deleteAlcoholType: (id) => (
//         deleteAPI(`AlcoholControllerType/${id}`)
//     )
// }