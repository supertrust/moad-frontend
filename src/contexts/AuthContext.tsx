import { useCargoLogin } from "@src/apis/cargo/cargo-auth";
import { isAdminRoute, isAuthenticateRoute, isCargoRoute, isWithoutAuthenticateRoute } from "@src/utils/route";
import { useRouter } from "next/router";
import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { AuthContextType, LoginPropsType, RegisterPropsType } from '@src/types/auth';
import { useLogin, useRegister, useLogout } from '@src/apis/auth';
import { removeAxiosToken, setAxiosToken } from '@src/utils/axios';
import { useGetUser, useGetUserRole } from '@src/apis/user';
import { queryClient } from '@src/services/ReactQueryClient';
import { parseJwt } from '@src/helpers';
import { toast } from "react-toastify";
import { useAdminAdvertiserLogin } from "@src/apis/admin";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}
const ADVERTISER_ROLE = {
    created_at:null,
    id:2,
    role_name:"Advertiser",
    updated_at:null,
}

function AuthProvider({ children }: AuthProviderProps) {
    const { mutateAsync: _login } = useLogin();
    const { mutateAsync : _cargoLogin} = useCargoLogin()
    const { mutateAsync : adminLogin } = useAdminAdvertiserLogin()
    const { mutateAsync: _register } = useRegister();
    const { mutateAsync: _logout } = useLogout();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const { data: userData,refetch:refetchUserData  } = useGetUser({ isAuthenticated : false });
    const [user,setUser] = useState(null);
    // const { data: userRole, isLoading : isRoleLoading } = useGetUserRole({ isAuthenticated });

    const localDataUpdated = async(currentUser : any={})=>{
        const res = await refetchUserData()
        const userDetails={...currentUser,...res?.data}
        if(userDetails){
            setUser(userDetails)
            const localUserInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : {};
            localStorage.setItem('user',JSON.stringify({
                ...localUserInfo,
                ...userDetails
            }))
        }
    }

    const checkAuth = useCallback(() => {
        if( (!isCargoRoute(router.pathname) && localStorage.getItem('cargo')) ||
            (isCargoRoute(router.pathname) && !localStorage.getItem('cargo')) ||
            (!isAdminRoute(router.pathname) && localStorage.getItem('admin')) ||
            (isAdminRoute(router.pathname) && !localStorage.getItem('admin'))
        ){
             localStorage.removeItem('token');
        }

        const token = localStorage.getItem('token');
        setToken(token);
        if (token) {
            const decodedJwt = parseJwt(token);
            const isTokenValid = decodedJwt && decodedJwt?.exp * 1000 > Date.now();
            token && setAxiosToken(token);
            setIsAuthenticated(isTokenValid);

            if (isTokenValid && isWithoutAuthenticateRoute()){
                if(isCargoRoute(router.pathname))
                    router.push("/cargo/dashboard")
                else if(isAdminRoute(router.pathname))
                    router.push("/admin/advertisement-management")
                else router.push("/dashboard")
            }

        } else {
            if(isCargoRoute(router.pathname) && isAuthenticateRoute(router.pathname)) router.push("/cargo/login")
            else if(isAdminRoute(router.pathname) && isAuthenticateRoute(router.pathname)) router.push("/admin/login")
            else if (isAuthenticateRoute(router.pathname)) router.push("/login")
        }
        setLoading(false);
    }, [isCargoRoute(router.pathname) , isAdminRoute(router.pathname)]);

    const login = useCallback(async (props: LoginPropsType) => {

        if(isCargoRoute(router.pathname)){
            try {
                const data = await _cargoLogin(props);
                localStorage.setItem("cargo","1");
                localStorage.setItem('token', data.token);
                checkAuth();
            } catch (error) {
                throw error
            }
        }
        else if(isAdminRoute(router.pathname)){
            try {
                const data = await adminLogin(props);
                localStorage.setItem("admin","1");
                localStorage.setItem('token', data.token);
                checkAuth();
            } catch (error) {
                throw error
            }
        }else{
            try {
                const data = await _login(props);
                localStorage.removeItem("cargo")
                localStorage.removeItem("admin")
                await localStorage.setItem("token", data.token);
                checkAuth();
                await localDataUpdated(data)
            } catch (error) {
                throw error
            }
        }
    }, [isCargoRoute(router.pathname)]);

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
        if(router.pathname?.includes("admin"))
            router.push("/admin/login")

        else {
            router.push("/login");
            await _logout();
        }

        queryClient.clear();
        removeAxiosToken();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null)
        setToken(null);
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(()=>{
        const currUserData = localStorage.getItem('user');
        if(currUserData)
            setUser(JSON.parse(currUserData))
        else localDataUpdated()
    },[])

    const value = useMemo(() => ({
        user: user || null,
        userRole: ADVERTISER_ROLE,
        isAuthenticated,
        token,
        login,
        register,
        logout,
        loading,
        isUserLoading:!user,
        isRoleLoading: false,
        localDataUpdated
    }), [
        isAuthenticated,
        user,
        token,
        loading,
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
