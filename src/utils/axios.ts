import { isAuthenticateRoute } from "@src/utils/route";
import Axios from 'axios';

import { API_BASE_URL } from '@src/config';

const axios = Axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'kr'
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
    return Promise.reject(errorMessage);
};

axios.interceptors.response.use(
    (res) => {
        if (!(res.data.status === "success") || ((res.data.success !== undefined) && !res.data.success)) {
            return handleError(res);
        }
        return res;
    },
    (err) => {
        if (err.response && err.response.status === 401) {
            // Check if the current path is not the login page
            if (isAuthenticateRoute(window.location.pathname)) {
                // Redirect to the login page
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        } else {
            return handleError(err);
        }
    }
);

export const setAxiosToken = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAxiosToken = () => {
    axios.defaults.headers.common.Authorization = undefined;
};

export default axios;
