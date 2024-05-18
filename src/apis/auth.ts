import { API_URL } from "@src/apis/urls";
import { useMutation } from "@tanstack/react-query";
import axios from "@src/utils/axios";

import {
    CheckUserProps,
    FindIdProps,
    ILoginResponse,
    IRegisterResponse,
    LoginPropsType,
    RegisterPropsType, ResetPasswordProps, SendOTP,
    VerifyInputPropsType, VerifyOTP
} from "@src/types/auth";

export const useLogin = () => useMutation<ILoginResponse, string, LoginPropsType>({
    mutationFn: async (props) => (await axios.post(API_URL.postLogin(), props,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })).data.data
});

export const useRegister = () => useMutation<IRegisterResponse, string, RegisterPropsType>({
    mutationFn: async (props) => {
        const {business_license, ...rest} = props;
        const formData = new FormData();
        Object.entries(props).forEach(([key, value]) => formData.append(key, value as string | Blob));
        return (await axios.post(API_URL.postRegister(), formData, {
            headers: { 
                'content-type': 'multipart/form-data',
                'Accept-Language': 'ko'
         }
        })).data
    }
});

export const useLogout = () => useMutation<void, string>({
    mutationFn: (props) => axios.post(API_URL.postLogout(), props)
});

export const useVerifyInput = () => useMutation<void, string, VerifyInputPropsType>({
    mutationFn: async (props) => {
        return((await axios.post(API_URL.postVerifyInput(), JSON.stringify({
        "key":props.key,
        "value":props.value.toString()
    }),{
        headers: { 
            'accept': '*/*',
            'Accept-Language': 'ko',
            'Content-Type' : 'application/json'
     }
    })).data)}
})

export const useFindId = () => useMutation<string, string, FindIdProps>({
    mutationFn: async (props) => (await axios.post(API_URL.postFindId(), props)).data.data
})

export const useCheckUser = () => useMutation<string, string, CheckUserProps>({
    mutationFn: async (props) => (await axios.post(API_URL.postCheckUser(), props)).data.data
})

export const useSendOTP = () => useMutation<string, string, SendOTP>({
    mutationFn: async (props) => (await axios.post(API_URL.postSendOtp(), props)).data.data
})

export const useVerifyOTP = () => useMutation<string, string, VerifyOTP>({
    mutationFn: async (props) => (await axios.post(API_URL.postVerifyOtp(), props)).data.data
})

export const useResetPassword = () => useMutation<string, string, ResetPasswordProps>({
    mutationFn: async (props) => (await axios.post(API_URL.postResetPassword(), props)).data.data
})
