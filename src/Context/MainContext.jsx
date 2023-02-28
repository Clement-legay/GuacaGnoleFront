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
    const [cart, setCart] = useState([]);

    // check user's role
    const canAdmin = () => {
        return user.roleId === 1;
    };

    // check if user has accessToken in his cookies
    const hasToken = () => {
        if (token === undefined) {
            const cookedToken = Cookies.get("token");
            const cookedRefreshToken = Cookies.get("refreshToken");
            if (cookedToken) {
                try {
                    const [token, id] = atob(cookedToken).split("::::");
                    setToken(token);
                    setUserId(id);
                } catch (e) {
                    Cookies.remove("token");
                    setToken(null);
                }
            } else if (cookedRefreshToken) {
                try {
                    const refreshToken = atob(cookedRefreshToken);
                    setRefreshToken(refreshToken);
                } catch (e) {
                    // Cookies.remove("refreshToken");
                    setRefreshToken(null);
                }
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
            setUser({
                id: id,
                roleId: item.roleId,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                address: item.address,
                username: item.username,
            })
            setToken(accessToken);
            setUserId(id);
            const tokenExpiresDate = new Date(tokenExpires);
            Cookies.set("token", btoa(accessToken + '::::' + id), { expires: tokenExpiresDate });

            if (remember) {
                const refreshExpiresDate = new Date(refreshExpires);
                Cookies.set("refreshToken", btoa(refreshToken), { expires: refreshExpiresDate });
            }
        } else {
            Cookies.remove("token")
            Cookies.remove("refreshToken")

            setToken(null)
            setUserId(null)
        }
    };

    // remove all token if failed
    const removeToken = (all=false) => {
        Cookies.remove("token")

        if (all) {
            Cookies.remove("refreshToken")
            setToken(null)
            setRefreshToken(null)
        }
    };

    // log the user out
    const logUserOut = () => {
        setUser(null);
        setUserId(null);
        setToken(null);
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
            try {
                const cart = JSON.parse(atob(string));
                setCart(cart);
            } catch (e) {
                Cookies.remove("cart");
                setCart([])
            }
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
        refreshToken,
        userId, cart,
        isAuth, canAdmin,
        setAuthUser, logUserOut,
        addToCart, removeFromCart,
        refreshCart, manageFilters,
        setCartQuantity, removeToken,
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