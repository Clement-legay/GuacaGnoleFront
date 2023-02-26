import axios from 'axios';

const API_URL = process.env.REACT_APP_DEV_API_LINK;

const RequestAPI = (params={file:false, token:false}) => {
    return axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type':  params.file ? "multipart/form-data" : 'application/json',
            'Authorization': params.token ? `bearer ${params.token}` : ''
        },
    });
};

export const fetchAPI = async (url, params) => {
    try {
        const response = await RequestAPI(params).get(url);
        return await response

    } catch (error) {
        return [];
    }
};

export const postAPI = async (url, data, params) => {
    try {
        const response = await RequestAPI(params).post(url, data);
        return await response;
    } catch (error) {
        return [];
    }
}

export const putAPI = async (url, data, params) => {
    try {
        const response = await RequestAPI(params).put(url, data);
        return await response;
    } catch (error) {
        return [];
    }
}

export const deleteAPI = async (url, params) => {
    try {
        const response = await RequestAPI(params).delete(url);
        return await response;
    } catch (error) {
        return [];
    }
}

