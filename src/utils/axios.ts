import Axios from 'axios';

import { API_BASE_URL } from '@src/config';
import { toast } from 'react-toastify';

const axios = Axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en'
    },
});

const handleError = (error: any) => {
    console.error('🚀 ~ Api error by axios ====> ', {
        url: error.config.url,
        method: error.config.method,
        request_data: error.config.data,
        params: error.config.params,
        errorMessage: error?.response?.data?.message || error?.data?.message || 'Something went wrong!',
        response_data: error.data || error.response.data,
    });
    const errorMessage = error?.response?.data?.message || error?.data?.message || 'Something went wrong!';
    toast(errorMessage, { type: 'error' });
    return Promise.reject(errorMessage);
};

axios.interceptors.response.use(
    (res) => {
        if (!(res.data.status === "success")) {
            return handleError(res);
        }
        return res;
    },
    (err) => handleError(err),
);

export const setAxiosToken = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAxiosToken = () => {
    axios.defaults.headers.common.Authorization = undefined;
};

export default axios;
