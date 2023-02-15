import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useState} from "react";

export const AppellationEntity = () => {
    const [appellations, setAppellations] = useState([]);

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
            postAPI("Appellation", data)
                .then(res => res.data)
        ),
        putAppellation: (id, data) => (
            putAPI(`Appellation/${id}`, data)
                .then(res => res.data)
        ),
        deleteAppellation: (id) => (
            deleteAPI(`Appellation/${id}`)
                .then(res => res.data)
        )
    };
};