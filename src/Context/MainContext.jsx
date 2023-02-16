import React, {createContext, useState} from 'react';
import {ProductEntity} from "./Entity/ProductEntity";
import {SupplierEntity} from "./Entity/SupplierEntity";
import {UserEntity} from "./Entity/UserEntity";
import {AppellationEntity} from "./Entity/AppellationEntity";
import {OfferEntity} from "./Entity/OfferEntity";
import Cookies from "js-cookie";
import {CommentEntity} from "./Entity/CommentEntity";
import {DomainEntity} from "./Entity/DomainEntity";
import {RegionEntity} from "./Entity/RegionEntity";
import {ProductOfferEntity} from "./Entity/ProductOfferEntity";
import {AlcoholTypeEntity} from "./Entity/AlcoholTypeEntity";
import {OrderEntity} from "./Entity/OrderEntity";
import {InvoiceEntity} from "./Entity/InvoiceEntity";

export const MainContext = createContext({
    themeStyle: "dark",
    theme: null,

    routeName: null,

    token: null,
    user: null,
    role: null,

    alcoholTypes: [],
    appellations: [],
    comments: [],
    domains: [],
    invoices: [],
    offers: [],
    orders: [],
    products: [],
    productOffers: [],
    regions: [],
    suppliers: [],
    users: [],
});

export const MainProvider = ({ children }) => {
    const [themeStyle, setThemeStyle] = useState();
    const [theme, setTheme] = useState(null);
    const [routeName, setRouteName] = useState(null);

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(undefined);
    const [role, setRole] = useState(null);

    const canAdmin = () => {
        return role === "admin";
    };

    const hasToken = () => {
        if (token === undefined) {
            const cookedToken = Cookies.get("token");
            if (cookedToken) {
                setToken(cookedToken);
            } else {
                setToken(null);
            }
        }

        return token !== null;
    };

    const isAuth = () => {
       return user !== null ? true : hasToken() ? undefined : false;
    };

    const setAuthUser = (item, remember) => {
        setToken(item.jwtToken);
        if (remember) {
            Cookies.set("token", item.jwtToken, { expires: 14 });
        }

        setUser(item.username);
        setRole(item.role ?? "admin");
    };

    const logUserOut = () => {
        setToken(null);
        setUser(null);
        setRole(null);
        Cookies.remove("token");
    };

    const state = {
        theme, setTheme,
        user, setUser,
        themeStyle, setThemeStyle,
        routeName, setRouteName,
        token, setToken,
        role, setRole,
        isAuth, canAdmin,
        setAuthUser, logUserOut,
        ...ProductEntity(),
        ...SupplierEntity(),
        ...UserEntity(),
        ...AppellationEntity(),
        ...OfferEntity(),
        ...CommentEntity(),
        ...DomainEntity(),
        ...RegionEntity(),
        ...ProductOfferEntity(),
        ...AlcoholTypeEntity(),
        ...OrderEntity(),
        ...InvoiceEntity()
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