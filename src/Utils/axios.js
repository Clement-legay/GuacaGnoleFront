import axios from 'axios';
const URL = process.env.DEV_API_LINK;
const API_KEY = process.env.DEV_API_KEY;

const requestAPI = (method, path, data=null) => {
    return axios.create({
        method: method,
        baseURL: URL + path,
        headers: {
            'Authorization': 'Bearer ' + API_KEY,
            'Content-Type': 'application/json',
        },
        data: data
    });
};
export default requestAPI;
