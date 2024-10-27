import { logger } from "@src/utils/func";
import { isAuthenticateRoute } from "@src/utils/route";
import { toast } from "react-toastify";
import Axios from 'axios';

import { API_BASE_URL } from '@src/config';


let router;
export const setRouter = (nextRouter) => {//Inject Router
    router = nextRouter
}

const acceptLang =
    typeof window !== 'undefined' && localStorage?.getItem('lang') === 'en' ? 'en' : 'ko';

const axios = Axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': acceptLang
    },
});

const handleError = (error: any) => {
    process.env.NODE_ENV === 'development' && logger.error('🚀 ~ Api error by axios ====> ', {
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

axios.interceptors.request.use((config) => {
    const lang = localStorage.getItem('lang') === "en" ? "en" : "ko" || 'ko';
    config.headers['Accept-Language'] = lang;
    return config;
});

axios.interceptors.response.use(
    (res) => {
        if (!(res.data.status === "success") || ((res.data.success !== undefined) && !res.data.success)) {
            return handleError(res);
        }
        if (res.data.message === "UNAUTHORIZED") {
            toast.error('이 항목에 대한 권한이 없습니다.')
            router.push('/dashboard')
            Promise.reject('Unauthorised calll')
        }
        return res;
    },
    (err) => {
        if (err.response && err.response.status === 401) {
            // Check if the current path is not the login page
            if (isAuthenticateRoute(window.location.pathname)) {
                // Redirect to the login page
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                if (window.location.pathname.includes('/login')) return;
                const returnUrl = window.location.href.replace(window.location.origin, '');
                router.push(`/login?returnUrl=${returnUrl}`);
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
