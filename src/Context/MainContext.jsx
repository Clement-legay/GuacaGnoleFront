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
    refreshToken: null,
    userId: null,
    user: null,
    cart: [],
    role: null,

    searchFilters: null,

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

    const [searchFilters, setSearchFilters] = useState(null);

    const [userId, setUserId] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(undefined);
    const [role, setRole] = useState(null);
    const [cart, setCart] = useState([]);

    // check user's role
    const canAdmin = () => {
        return role === "admin";
    };

    // check if user has accessToken in his cookies
    const hasToken = () => {
        if (token === undefined) {
            const cookedToken = Cookies.get("token");
            const cookedRefreshToken = Cookies.get("refreshToken");
            if (cookedToken) {
                const [token, id] = atob(cookedToken).split("::::");
                setToken(token);
                setUserId(id);
            } else if (cookedRefreshToken) {
                const refreshToken = atob(cookedRefreshToken);
                setRefreshToken(refreshToken);
            } else {
                setToken(null)
            }
        }

        return token !== null;
    };

    // check if user is authenticated
    const isAuth = () => {
        return user !== null ? true : hasToken();
    };

    // log the user in
    const setAuthUser = (item, remember) => {
        if (item) {
            const { accessToken, id, tokenExpires, refreshExpires, refreshToken } = item;
            setToken(accessToken);
            setUserId(id);
            Cookies.set("token", btoa(accessToken + '::::' + id), { expires: new Date(tokenExpires) });

            if (remember) {
                Cookies.set("refreshToken", btoa(refreshToken), { expires: new Date(refreshExpires) });
            }
        } else {
            Cookies.remove("token")
            Cookies.remove("refreshToken")

            setToken(null)
            setUserId(null)
        }
    };

    // log the user out
    const logUserOut = () => {
        console.log("logout");
        setToken(null);
        setUser(null);
        setRole(null);
        setUserId(null);
        setRefreshToken(null);
        Cookies.remove("token");
        Cookies.remove("refreshToken");
    };

    // add an offer to the cart and save it in cookies
    const addToCart = (item) => {
        if (cart.find((i) => i.id === item)) {
            return false;
        } else {
            const newCart = [...cart, { id: item, quantity: 1 }];
            setCart(newCart);
            const string = JSON.stringify(newCart);
            Cookies.set("cart", btoa(string), { expires: 14 });
            return true;
        }
    };

    // remove an offer from the cart and save it in cookies
    const removeFromCart = (item) => {
        if (cart.find((i) => i.id === item)) {
            const newCart = cart.filter((i) => i.id !== item);
            setCart(newCart);
            const string = JSON.stringify(newCart);
            Cookies.set("cart", btoa(string), { expires: 14 });
            return true;
        } else {
            return false;
        }
    };

    // set the quantity of an offer in the cart and save it in cookies
    const setCartQuantity = (item, quantity) => {
        if (quantity < 1) {
            removeFromCart(item);
        } else {
            const newCart = cart.map((i) => {
                if (i.id === item) {
                    i.quantity = quantity;
                }

                return i;
            });
            setCart(newCart);
            const string = JSON.stringify(newCart);
            Cookies.set("cart", btoa(string), { expires: 14 });
        }
    };

    // refresh the cart from cookies
    const refreshCart = () => {
        const string = Cookies.get("cart");
        if (string) {
            const cart = JSON.parse(atob(string));
            setCart(cart);
        }

        return true;
    };

    // manage the search filters
    const manageFilters = (filters=null) => {
        if (filters) {
            setSearchFilters(filters);
        } else {
            return searchFilters;
        }
    };

    const state = {
        theme, setTheme,
        user, setUser,
        themeStyle, setThemeStyle,
        routeName, setRouteName,
        token, setToken,
        role, setRole,
        refreshToken,
        userId, cart,
        isAuth, canAdmin,
        setAuthUser, logUserOut,
        addToCart, removeFromCart,
        refreshCart, manageFilters,
        setCartQuantity,
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