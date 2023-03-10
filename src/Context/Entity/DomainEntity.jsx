import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useState} from "react";

export const DomainEntity = (token) => {
    const [domains, setDomains] = useState([]);

    return {
        domains: domains,
        fetchDomains: (store = false) => (
            fetchAPI("/Domain")
                .then((res) => {
                    res.data = res.data.map(
                        (item) => {
                            item.id = item.domainId;
                            delete item.domainId;
                            return item
                        }
                    );
                    if (store) {
                        setDomains(res.data);
                    }
                    return res.data;
                })
        ),
        fetchDomainById: (id) => (
            fetchAPI(`Domain/${id}`)
                .then((res) => {
                    res.data.id = res.data.domainId;
                    delete res.data.domainId;
                    return res.data;
                })
        ),
        fetchDomainByName: (name) => (
            fetchAPI(`Domain/ByName/${name}`)
                .then((res) => {
                    res.data.id = res.data.domainId;
                    delete res.data.domainId;
                    return res.data;
                })
        ),
        postDomain: (data) => (
            postAPI("Domain", data, {token: token})
                .then((res) => {
                    res.data.id = res.data.domainId;
                    delete res.data.domainId;
                    return res;
                })
        ),
        putDomain: (id, data) => (
            putAPI(`Domain/${id}`, data, {token: token})
                .then((res) => {
                    res.data.id = res.data.domainId;
                    delete res.data.domainId;
                    return res;
                })
        ),
        deleteDomain: (id) => (
            deleteAPI(`Domain/${id}`, {token: token})
                .then((res) => {
                    res.data.id = res.data.domainId;
                    delete res.data.domainId;
                    return res;
                })
        )
    };
};