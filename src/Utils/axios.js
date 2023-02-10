import axios from 'axios';
const API_URL = process.env.REACT_APP_DEV_API_LINK;
// const API_KEY = process.env.REACT_APP_DEV_API_KEY;

const requestAPI = (token) => {
    return axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        }
    });
};

export const fetchAPI = async (url, token=null) => {
    try {
        const response = await requestAPI(token).get(url);
        return Promise.resolve(response);
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const postAPI = (url, data, token=null) => {
    try {
        const response = requestAPI(token).post(url, data);
        return Promise.resolve(response);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const putAPI = (url, data, token=null) => {
    return requestAPI(token).put(url, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const deleteAPI = (url, token=null) => {
    return requestAPI(token).delete(url)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
}

