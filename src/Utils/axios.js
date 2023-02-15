import axios from 'axios';
const API_URL = process.env.REACT_APP_DEV_API_LINK;
// const API_KEY = process.env.REACT_APP_DEV_API_KEY;

const requestAPI = (params=null) => {
    return axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type':  params ? params.file ? "multipart/form-data" : 'application/json' : "application/json",
            'Authorization': params ? params.token ? `Bearer ${params.token}` : '' : ''
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

export const postAPI = (url, data, params={token:null, file:false}) => {
    try {
        const response = requestAPI(params).post(url, data);
        return Promise.resolve(response);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const putAPI = (url, data, token=null) => {
    try {
        const response = requestAPI(token).put(url, data);
        return Promise.resolve(response);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const deleteAPI = (url, token=null) => {
    try {
        const response = requestAPI(token).delete(url);
        return Promise.resolve(response);
    } catch (error) {
        console.log(error);
        return [];
    }
}

