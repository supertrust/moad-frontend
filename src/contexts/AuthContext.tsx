import { isAuthenticateRoute, isWithoutAuthenticateRoute } from "@src/utils/route";
import { useRouter } from "next/router";
import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { AuthContextType, LoginPropsType, RegisterPropsType } from '@src/types/auth';
import { useLogin, useRegister, useLogout } from '@src/apis/auth';
import { removeAxiosToken, setAxiosToken } from '@src/utils/axios';
import { useGetUser, useGetUserRole } from '@src/apis/user';
import { queryClient } from '@src/services/ReactQueryClient';
import { parseJwt } from '@src/helpers';
import { toast } from "react-toastify";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
    const { mutateAsync: _login } = useLogin();
    const { mutateAsync: _register } = useRegister();
    const { mutateAsync: _logout } = useLogout();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const { data: user, isLoading : isUserLoading } = useGetUser({ isAuthenticated });
    const { data: userRole, isLoading : isRoleLoading } = useGetUserRole({ isAuthenticated });

    const checkAuth = useCallback(() => {
        const token = localStorage.getItem('token');
        setToken(token);
        if (token) {
            const decodedJwt = parseJwt(token);
            const isTokenValid = decodedJwt && decodedJwt?.exp * 1000 > Date.now();
            token && setAxiosToken(token);
            setIsAuthenticated(isTokenValid);

            if (isTokenValid && isWithoutAuthenticateRoute())
                router.push("/dashboard")

        } else if (isAuthenticateRoute(router.pathname)) router.push("/login")
        setLoading(false);
    }, []);

    const login = useCallback(async (props: LoginPropsType) => {
        try {
            const data = await _login(props);
            localStorage.setItem('token', data.token);
            checkAuth();
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

    }, []);

    const logout = useCallback(async () => {
        router.push("/login")
        await _logout();
        queryClient.clear();
        removeAxiosToken();
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        checkAuth();
    }, []);

    const value = useMemo(() => ({
        user: user || null,
        userRole: userRole || null,
        isAuthenticated,
        token,
        login,
        register,
        logout,
        loading,
        isUserLoading,
        isRoleLoading
    }), [
        isAuthenticated,
        user,
        token,
        loading,
        userRole,
        isUserLoading,
        isRoleLoading
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
