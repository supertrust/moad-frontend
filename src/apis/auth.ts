import { useMutation } from "@tanstack/react-query";
import axios from "@src/utils/axios";

import {
    FindIdProps,
    ILoginResponse,
    IRegisterResponse,
    LoginPropsType,
    RegisterPropsType,
    VerifyInputPropsType
} from "@src/types/auth";

export const useLogin = () => useMutation<ILoginResponse, string, LoginPropsType>({
    mutationFn: async (props) => (await axios.post("/api/login", props)).data.data
});

export const useRegister = () => useMutation<IRegisterResponse, string, RegisterPropsType>({
    mutationFn: async (props) => (await axios.post("/api/register", props)).data
});

export const useLogout = () => useMutation<void, string>({
    mutationFn: (props) => axios.post("/api/logout", props)
});

export const useVerifyInput = () => useMutation<void, string, VerifyInputPropsType>({
    mutationFn: async (props) => (await axios.post("/api/verify-input", props)).data
})

export const useFindId = () => useMutation<string, string, FindIdProps>({
    mutationFn: async (props) => (await axios.post("/api/get-id", props)).data.data
})
