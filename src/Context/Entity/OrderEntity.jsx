import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useContext, useState} from "react";
import {MainContext} from "../MainContext";

export const OrderEntity = () => {
    const [orders, setOrders] = useState([]);
    const { token } = useContext(MainContext);


    return {
        orders: orders,
        fetchOrders: (store = false) => (
            fetchAPI("/Order")
                .then((res) => {
                    res.data = res.data.length > 0 ? res.data.map(
                        (Order) => {
                            Order.id = Order.OrderId;
                            delete Order.OrderId;
                            return Order
                        }
                    ) : [];
                    if (store) {
                        setOrders(res.data);
                    }
                    return res.data;
                })
        ),
        fetchOrderById: (id) => (
            fetchAPI(`Order/${id}`)
                .then(res => res.data)
        ),
        postOrder: (data) => (
            postAPI("Order", data, {token: token})
                .then(res => res.data)
        ),
        postOrderOffer: (data) => (
            postAPI("Order/orderOffer", data, {token: token})
                .then(res => res.data)
        ),
        putOrder: (id, data) => (
            putAPI(`Order/${id}`, data)
                .then(res => res.data)
        ),
        deleteOrder: (id) => (
            deleteAPI(`Order/${id}`)
                .then(res => res.data)
        )
    };
};