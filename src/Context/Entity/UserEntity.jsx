import {deleteAPI, fetchAPI, postAPI} from "../../Utils/axios";
import {useState} from "react";

const userLinkPrefix = "/api/Auth";

export const UserEntity = () => {
    const [users, setUsers] = useState([]);

    return {
        users: users,
        fetchUsers: (store = false) => (
            fetchAPI(`${userLinkPrefix}/GetAllUsers`)
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
            fetchAPI(`${userLinkPrefix}/GetUserById/${id}`)
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
        postToken: (token) => {
            // return postAPI(`${userLinkPrefix}/Token`, token)
            //     .then(res => res.data)
            return {
                id: 1,
                jwtToken: token,
                username: "fakeConnection",
            }
        },
        deleteUser: (id) => (
            deleteAPI(`${userLinkPrefix}/delete/${id}`)
        ),
    }
};