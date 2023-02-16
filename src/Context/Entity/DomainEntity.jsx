import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useContext, useState} from "react";
import {MainContext} from "../MainContext";

export const DomainEntity = () => {
    const [domains, setDomains] = useState([]);
    const { token } = useContext(MainContext);

    return {
        domains: domains,
        fetchDomains: (store = false) => (
            fetchAPI("/Domain")
                .then((res) => {
                    if (store) {
                        setDomains(res.data);
                    }
                    return res.data;
                })
        ),
        fetchDomainById: (id) => (
            fetchAPI(`Domain/${id}`)
                .then(res => res.data)
        ),
        fetchDomainByName: (name) => (
            fetchAPI(`Domain/ByName/${name}`)
                .then(res => res.data)
        ),
        postDomain: (data) => (
            postAPI("Domain", data, {token: token})
                .then(res => res.data)
        ),
        putDomain: (id, data) => (
            putAPI(`Domain/${id}`, data, {token: token})
                .then(res => res.data)
        ),
        deleteDomain: (id) => (
            deleteAPI(`Domain/${id}`, {token: token})
                .then(res => res.data)
        )
    };
};