import {deleteAPI, fetchAPI, postAPI, putAPI} from "../../Utils/axios";
import {useState} from "react";

const userLinkPrefix = "/Auth";

export const UserEntity = (token) => {
    const [users, setUsers] = useState([]);

    return {
        users: users,
        fetchUsers: (store = false) => (
            fetchAPI(`${userLinkPrefix}/GetAllUsers`, {token: token})
                .then((res) => {
                    res.data = res.data.length > 0 ? res.data.map(
                        (user) => {
                            user.id = user.userId;
                            delete user.userId;
                            return user
                        }
                    ) : [];
                    if (store) {
                        setUsers(res.data);
                    }
                    return res.data;
                })
        ),
        fetchUserById: (id) => (
            fetchAPI(`${userLinkPrefix}/GetUserById/${id}`, {token: token})
                .then((res) => {
                    res.data.id = res.data.userId;
                    delete res.data.userId;
                    return res.data;
                })
        ),
        fetchCurrentUser: (forceToken) => (
            fetchAPI(`${userLinkPrefix}/GetMesInfos`, {token: forceToken})
                .then((res) => {
                    res.data.id = res.data.userId;
                    delete res.data.userId;
                    return res.data;
                })
        ),  
        fetchUserByUsername: (username) => (
            fetchAPI(`${userLinkPrefix}/GetUserByUsername/${username}`)
        ),
        fetchUserByEmail: (email) => (
            fetchAPI(`${userLinkPrefix}/GetUserByEmail/${email}`)
        ),
        postRegister: (data) => (
            postAPI(`${userLinkPrefix}/Register`, data)
                .then(res => res)
        ),
        postLogin: (data) => (
            postAPI(`${userLinkPrefix}/Login`, data)
                .then(res => res)
        ),
        postToken: (data) => (
            postAPI(`${userLinkPrefix}/RefreshToken`, data)
                .then(res => res)
        ),
        putUser: (id, data) => (
            postAPI(`${userLinkPrefix}/UpdateUser/${id}`, data, {token: token})
                .then(res => res)
        ),
        putCurrentUser: (data) => (
            putAPI(`${userLinkPrefix}/UpdateMesInfos`, data, {token: token})
                .then(res => res)
        ),
        deleteUser: (id) => (
            deleteAPI(`${userLinkPrefix}/DeleteUser/${id}`, {token: token})
                .then(res => res.data)
        ),
    }
};