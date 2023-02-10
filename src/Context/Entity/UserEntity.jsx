import {deleteAPI, fetchAPI, postAPI} from "../../Utils/axios";
import {useState} from "react";

export const UserEntity = () => {
    const [users, setUsers] = useState([]);

    return {
        users: users,
        fetchUsers: (store = false) => (
            fetchAPI("api/Auth/GetAllUsers")
                .then((res) => {
                    if (store) {
                        setUsers(res.data);
                    }
                    return res.data;
                })
        ),
        fetchUserById: (id) => (
            fetchAPI(`api/Auth/GetUserById/${id}`)
        ),
        fetchUserByUsername: (username) => (
            fetchAPI(`api/Auth/GetUserByUsername/${username}`)
        ),
        fetchUserByEmail: (email) => (
            fetchAPI(`api/Auth/GetUserByEmail/${email}`)
        ),
        postRegister: (data) => (
            postAPI("api/Auth/Register", data)
                .then(res => res.data)
        ),
        postLogin: (data) => (
            postAPI("api/Auth/Login", data)
                .then(res => res.data)
        ),
        deleteUser: (id) => (
            deleteAPI(`api/Auth/delete/${id}`)
        ),
    }
};