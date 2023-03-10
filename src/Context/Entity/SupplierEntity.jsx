import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useState} from "react";

export const SupplierEntity = (token) => {
    const [suppliers, setSuppliers] = useState([]);

    return {
        suppliers: suppliers,
        fetchSuppliers: (store = false) => (
            fetchAPI("Furnisher")
                .then((res) => {
                    res.data = res.data.length > 0 ? res.data.map(
                        (supplier) => {
                            supplier.id = supplier.furnisherId;
                            delete supplier.furnisherId;
                            return supplier;
                        }
                    ) : [];
                    if (store) {
                        setSuppliers(res.data);
                    }
                    return res.data;
                })
        ),
        fetchSupplierById: (id) => (
            fetchAPI(`Furnisher/${id}`)
                .then((res) => {
                    res.data.id = res.data.furnisherId;
                    delete res.data.furnisherId;
                    return res.data;
                })
        ),
        fetchSupplierProducts: (id) => (
            fetchAPI(`Furnisher/getProducts/${id}`)
                .then((res) => {
                    res.data = res.data.length > 0 ? res.data.map(
                        (product) => {
                            product.id = product.productId;
                            delete product.productId;
                            return product;
                        }
                    ) : [];
                    return res.data;
                })
        ),
        fetchSupplierByNames: (name) => (
            fetchAPI(`Furnisher/ByName/${name}`)
                .then((res) => {
                    res.data = res.data.length > 0 ? res.data.map(
                        (supplier) => {
                            supplier.id = supplier.furnisherId;
                            delete supplier.furnisherId;
                            return supplier;
                        }
                    ) : [];
                    return res.data;
                })
        ),
        postSupplier: (data) => (
            postAPI("Furnisher", data, {token:token})
                .then((res) => res)
        ),
        putSupplier: (id, data) => (
            putAPI(`Furnisher/${id}`, data, {token:token})
                .then((res) => res)

        ),
        deleteSupplier: (id) => (
            deleteAPI(`Furnisher/${id}`, {token:token})
                .then((res) => res)
        )
    }
};