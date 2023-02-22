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

    const manageFilters = (filters=null) => {
        if (filters) {
            const json = JSON.stringify(filters);
            Cookies.set('filters', btoa(json), { expires: 1 / 48 });
        } else {
            const filters = Cookies.get('filters');
            if (filters) {
                return JSON.parse(atob(filters));
            } else {
                return null;
            }
        }
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
        manageFilters,
        ...ProductEntity(token),
        ...SupplierEntity(token),
        ...UserEntity(token),
        ...AppellationEntity(token),
        ...OfferEntity(token),
        ...CommentEntity(token),
        ...DomainEntity(token),
        ...RegionEntity(token),
        ...ProductOfferEntity(token),
        ...AlcoholTypeEntity(token),
        ...OrderEntity(token),
        ...InvoiceEntity(token)
    };

    return (
        <MainContext.Provider value={state}>
            {children}
        </MainContext.Provider>
    );
};