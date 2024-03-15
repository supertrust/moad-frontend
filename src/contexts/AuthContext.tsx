import { useCargoLogin } from "@src/apis/cargo/cargo-auth";
import { isAdminRoute, isAuthenticateRoute, isCargoRoute, isWithoutAuthenticateRoute } from "@src/utils/route";
import { useRouter } from "next/router";
import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { AuthContextType, Dictionary, Langs, LoginPropsType, RegisterPropsType } from '@src/types/auth';
import { useLogin, useRegister, useLogout } from '@src/apis/auth';
import { removeAxiosToken, setAxiosToken } from '@src/utils/axios';
import { useGetUser, useGetUserRole } from '@src/apis/user';
import { queryClient } from '@src/services/ReactQueryClient';
import { parseJwt } from '@src/helpers';
import { toast } from "react-toastify";
import en from "@src/dictionaries/en.json";
import kr from "@src/dictionaries/kr.json";
import { useAdminAdvertiserLogin } from "@src/apis/admin";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

const ADVERTISER_ROLE = {
    created_at: null,
    id: 2,
    role_name: "Advertiser",
    updated_at: null,
}

function AuthProvider({ children }: AuthProviderProps) {
    const { mutateAsync: _login } = useLogin();
    const { mutateAsync: _register } = useRegister();
    const { mutateAsync: _logout } = useLogout();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState<Langs>('kr');
    const [dictionary, setDictionary] = useState<Dictionary>();
    const [token, setToken] = useState<string | null>(null);

    const { data: userData, refetch: refetchUserData,isLoading : isUserLoading } = useGetUser({ isAuthenticated: false });
    const [user, setUser] = useState(null);

    useEffect(() => {
        const dictionaries = { en, kr }

        setDictionary(dictionaries[lang])
    }, [lang]);

    const localDataUpdated = async (currentUser: any = {}) => {
        const res = await refetchUserData()
        const userDetails = { ...currentUser, ...res?.data }
        if (userDetails) {
            setUser(userDetails)
            const localUserInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : {};
            localStorage.setItem('user', JSON.stringify({
                ...localUserInfo,
                ...userDetails
            }))
        }
    }

    const checkAuth = useCallback(() => {
        const token = localStorage.getItem('token');
        setToken(token);
        if (token) {
            const decodedJwt = parseJwt(token);
            const isTokenValid = decodedJwt && decodedJwt?.exp * 1000 > Date.now();
            token && setAxiosToken(token);
        }
        setLoading(false);
    }, []);

    const login = useCallback(async (props: LoginPropsType) => {
        try {
            const data = await _login(props);
            await localStorage.setItem("token", data.token);
            checkAuth();
            await localDataUpdated(data)
        } catch (error) {
            throw error
        }

    }, []);

    const register = useCallback(async (props: RegisterPropsType) => {
        return _register(props).then(res => {
            return true
        }).catch(error => {
            toast(error, {
                type: "error",
            })
            return false
        })

    }, [isCargoRoute(router.pathname)]);

    const logout = useCallback(async () => {
        router.push("/login");
        await _logout();
        queryClient.clear();
        removeAxiosToken();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null)
        setToken(null);
    }, []);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        const currUserData = localStorage.getItem('user');
        if (currUserData)
            setUser(JSON.parse(currUserData))
        else localDataUpdated()
    }, [])

    const value = useMemo(() => ({
        user: user || null,
        userRole: ADVERTISER_ROLE,
        isAuthenticated : !!user,
        token,
        login,
        register,
        logout,
        lang,
        setLang,
        dictionary,
        loading : loading,
        isUserLoading: !user && isUserLoading,
        isRoleLoading: false,
        localDataUpdated
    }), [
        lang,
        user,
        token,
        loading,
        dictionary,
        isUserLoading
    ]);

    return (
        <AuthContext.Provider
            // @ts-ignore
            value={value}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };
