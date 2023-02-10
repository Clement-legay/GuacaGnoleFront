import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useState} from "react";

export const SupplierEntity = () => {
    const [suppliers, setSuppliers] = useState([]);

    return {
        suppliers: suppliers,
        fetchSuppliers: (store = false) => (
            fetchAPI("Furnisher")
                .then((res) => {
                    if (store) {
                        console.log(res.data);
                        setSuppliers(res.data);
                    }
                    return res.data;
                })
        ),
        fetchSupplierById: (id) => (
            fetchAPI(`Furnisher/${id}`)
        ),
        postSupplier: (data) => (
            postAPI("Furnisher", data)
        ),
        putSupplier: (id, data) => (
            putAPI(`Furnisher/${id}`, data)
        ),
        deleteSupplier: (id) => (
            deleteAPI(`Furnisher/${id}`)
        ),
        fetchSupplierProducts: (id) => (
            fetchAPI(`Furnisher/getProducts/${id}`)
        ),
        fetchSupplierByNames: (name) => (
            fetchAPI(`Furnisher/ByName/${name}`)
        )
    }
};