import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useState} from "react";

export const AppellationEntity = (token) => {
    const [appellations, setAppellations] = useState([]);

    return {
        appellations: appellations,
        fetchAppellations: (store = false) => (
            fetchAPI("/Appellation")
                .then((res) => {
                    res.data = res.data.length > 0 ? res.data.map(
                        (appellation) => {
                            appellation.id = appellation.appellationId;
                            delete appellation.appellationId;
                            return appellation
                        }
                    ) : [];
                    if (store) {
                        setAppellations(res.data);
                    }
                    return res.data;
                })
        ),
        fetchAppellationById: (id) => (
            fetchAPI(`Appellation/${id}`)
                .then((res) => {
                    res.data.id = res.data.appellationId;
                    delete res.data.appellationId;
                    return res.data;
                })
        ),
        fetchAppellationByName: (name) => (
            fetchAPI(`Appellation/GetByName/${name}`)
                .then((res) => {
                    res.data.id = res.data.appellationId;
                    delete res.data.appellationId;
                    return res.data;
                })
        ),
        postAppellation: (data) => (
            postAPI("Appellation", data
                // , {token: token}
            )
                .then((res) => {
                    res.data.id = res.data.appellationId;
                    delete res.data.appellationId;
                    return res;
                })
        ),
        putAppellation: (id, data) => (
            putAPI(`Appellation/${id}`, data, {token: token})
                .then((res) => {
                    res.data.id = res.data.appellationId;
                    delete res.data.appellationId;
                    return res;
                })
        ),
        deleteAppellation: (id) => (
            deleteAPI(`Appellation/${id}`, {token: token})
                .then((res) => {
                    res.data.id = res.data.appellationId;
                    delete res.data.appellationId;
                    return res;
                })
        )
    };
};