import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useContext, useState} from "react";
import {MainContext} from "../MainContext";

export const AppellationEntity = () => {
    const [appellations, setAppellations] = useState([]);
    const { token } = useContext(MainContext);

    return {
        appellations: appellations,
        fetchAppellations: (store = false) => (
            fetchAPI("/Appellation")
                .then((res) => {
                    res.data = res.data.map(
                        (appellation) => {
                            appellation.id = appellation.appellationId;
                            delete appellation.appellationId;
                            return appellation
                        }
                    );
                    if (store) {
                        setAppellations(res.data);
                    }
                    return res.data;
                })
        ),
        fetchAppellationById: (id) => (
            fetchAPI(`Appellation/${id}`)
                .then(res => res.data)
        ),
        fetchAppellationByName: (name) => (
            fetchAPI(`Appellation/GetByName/${name}`)
                .then(res => res.data)
        ),
        postAppellation: (data) => (
            postAPI("Appellation", data, {token: token})
                .then(res => res.data)
        ),
        putAppellation: (id, data) => (
            putAPI(`Appellation/${id}`, data, {token: token})
                .then(res => res.data)
        ),
        deleteAppellation: (id) => (
            deleteAPI(`Appellation/${id}`, {token: token})
                .then(res => res.data)
        )
    };
};