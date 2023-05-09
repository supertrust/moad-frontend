import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { AuthContextType, LoginPropsType, RegisterPropsType } from '@src/types/auth';
import { useLogin, useRegister, useLogout } from '@src/apis/auth';
import { removeAxiosToken, setAxiosToken } from '@src/utils/axios';
import { useGetUser } from '@src/apis/user';
import { queryClient } from '@src/services/ReactQueryClient';
import { parseJwt } from '@src/helpers';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
    const { mutateAsync: _login } = useLogin();
    const { mutateAsync: _register } = useRegister();
    const { mutateAsync: _logout } = useLogout();

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const { data: user } = useGetUser({ isAuthenticated });

    const checkAuth = useCallback(() => {
        const token = localStorage.getItem('token');
        setToken(token);
        if (token) {
            const decodedJwt = parseJwt(token);
            const isTokenValid = decodedJwt && decodedJwt?.exp * 1000 > Date.now();
            token && setAxiosToken(token);
            setIsAuthenticated(isTokenValid);
        }
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
        try {
            const data = await _register(props);
            localStorage.setItem('token', data.token);
            checkAuth();
        } catch (error) {
            //
        }
    }, []);

    const logout = useCallback(async () => {
        _logout();
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
        isAuthenticated,
        token,
        login,
        register,
        logout,
        loading
    }), [
        isAuthenticated,
        user,
        token,
        loading
    ]);

    return (
        <AuthContext.Provider
            value={value}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };