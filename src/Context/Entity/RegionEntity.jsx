import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useState} from "react";

export const RegionEntity = (token) => {
    const [regions, setRegions] = useState([]);

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
                .then((res) => {
                    res.data.id = res.data.regionID;
                    delete res.data.regionID;
                    return res.data;
                })
        ),
        fetchRegionByName: (name) => (
            fetchAPI(`Region/ByName/${name}`)
                .then((res) => {
                    res.data.id = res.data.regionID;
                    delete res.data.regionID;
                    return res.data;
                })
        ),
        postRegion: (data) => (
            postAPI("Region", data
                // , {token: token}
            )
                .then((res) => {
                    res.data.id = res.data.regionID;
                    delete res.data.regionID;
                    return res;
                })
        ),
        putRegion: (id, data) => (
            putAPI(`Region/${id}`, data, {token: token})
                .then((res) => {
                    res.data.id = res.data.regionID;
                    delete res.data.regionID;
                    return res;
                })
        ),
        deleteRegion: (id) => (
            deleteAPI(`Region/${id}`, {token: token})
                .then((res) => {
                    res.data.id = res.data.regionID;
                    delete res.data.regionID;
                    return res;
                })
        )
    };
};