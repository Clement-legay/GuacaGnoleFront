import axios from 'axios';
const API_URL = process.env.REACT_APP_DEV_API_LINK;

const RequestAPI = (params={token:null, file:false}) => {
    return axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type':  params.file ? "multipart/form-data" : 'application/json',
            'Authorization': params.token ? `Bearer ${params.token}` : ''
        }
    });
};

export const fetchAPI = async (url, params={token:null, file:false}) => {
    try {
        const response = await RequestAPI(params).get(url);
        return Promise.resolve(response);
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const postAPI = (url, data, params={token:null, file:false}) => {
    try {
        const response = RequestAPI(params).post(url, data);
        return Promise.resolve(response);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const putAPI = (url, data, params={token:null, file:false}) => {
    try {
        const response = RequestAPI(params).put(url, data);
        return Promise.resolve(response);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const deleteAPI = (url, params={token:null, file:false}) => {
    try {
        const response = RequestAPI(params).delete(url);
        return Promise.resolve(response);
    } catch (error) {
        console.log(error);
        return [];
    }
}

