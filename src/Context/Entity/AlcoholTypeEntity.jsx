import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useState} from "react";

export const AlcoholTypeEntity = (token) => {
    const [alcoholTypes, setAlcoholTypes] = useState([]);

    return {
        alcoholTypes: alcoholTypes,
        fetchAlcoholTypes: (store = false) => (
            fetchAPI("/AlcoholControllerType")
                .then((res) => {
                    res.data = res.data.length > 0 ? res.data.map(
                        (item) => {
                            item.id = item.alcoholTypeId;
                            delete item.alcoholTypeId;
                            return item
                        }
                    ) : [];
                    if (store) {
                        setAlcoholTypes(res.data);
                    }
                    return res.data;
                })
        ),
        fetchAlcoholTypeById: (id) => (
            fetchAPI(`AlcoholControllerType/${id}`)
                .then((res) => {
                    res.data.id = res.data.alcoholTypeId;
                    delete res.data.alcoholTypeId;
                    return res.data;
                })
        ),
        fetchAlcoholTypeStock: (id) => (
            fetchAPI(`AlcoholControllerType/Stock/${id}`)
                .then(res => res.data)
        ),
        postAlcoholType: (data) => (
            postAPI("AlcoholControllerType", data, {token: token})
                .then(res => res.data)
        ),
        putAlcoholType: (id, data) => (
            putAPI(`AlcoholControllerType/${id}`, data, {token: token})
                .then(res => res.data)
        ),
        deleteAlcoholType: (id) => (
            deleteAPI(`AlcoholControllerType/${id}`, {token: token})
                .then(res => res.data)
        )
    };
};