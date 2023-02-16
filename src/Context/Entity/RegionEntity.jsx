import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useContext, useState} from "react";
import {MainContext} from "../MainContext";

export const RegionEntity = () => {
    const [regions, setRegions] = useState([]);
    const { token } = useContext(MainContext);

    return {
        regions: regions,
        fetchRegions: (store = false) => (
            fetchAPI("/Region")
                .then((res) => {
                    res.data = res.data.length > 0 ? res.data.map(
                        (item) => {
                            item.id = item.regionID;
                            delete item.regionID;
                            return item;
                        }
                    ) : [];
                    if (store) {
                        setRegions(res.data);
                    }
                    return res.data;
                })
        ),
        fetchRegionById: (id) => (
            fetchAPI(`Region/${id}`)
                .then(res => res.data)
        ),
        fetchRegionByName: (name) => (
            fetchAPI(`Region/ByName/${name}`)
                .then(res => res.data)
        ),
        postRegion: (data) => (
            postAPI("Region", data, {token: token})
                .then(res => res.data)
        ),
        putRegion: (id, data) => (
            putAPI(`Region/${id}`, data, {token: token})
                .then(res => res.data)
        ),
        deleteRegion: (id) => (
            deleteAPI(`Region/${id}`, {token: token})
                .then(res => res.data)
        )
    };
};