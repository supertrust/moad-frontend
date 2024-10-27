import useMediaQuery from "@mui/material/useMediaQuery";
import { useLogin, useLogout, useRegister } from '@src/apis/auth';
import { useGetUser } from '@src/apis/user';
import en from "@src/dictionaries/en.json";
import kr from "@src/dictionaries/kr.json";
import { parseJwt } from '@src/helpers';
import { queryClient } from '@src/services/ReactQueryClient';
import { AuthContextType, Dictionary, Langs, LoginPropsType, RegisterPropsType } from '@src/types/auth';
import axios, { removeAxiosToken, setAxiosToken } from '@src/utils/axios';
import { logger } from "@src/utils/func";
import { isCargoRoute } from "@src/utils/route";
import { useRouter } from "next/router";
import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from "react-toastify";

const   AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

const ADVERTISER_ROLE = {
    created_at: null,
    id: 2,
    role_name: "Advertiser",
    updated_at: null,
}

export const UserStatus = {
    Active: 0,
    Blocked : 1,
    Waiting: 2,
    Rejected: 3
}

function AuthProvider({ children }: AuthProviderProps) {

    const isPcOnly = useMediaQuery('(min-width:1024px)');
    const { mutateAsync: _login } = useLogin();
    const { mutateAsync: _register } = useRegister();
    const { mutateAsync: _logout } = useLogout();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState<Langs>('kr');
    const [dictionary, setDictionary] = useState<Dictionary>();
    const [token, setToken] = useState<string | null>(null);

    const {
        data: userData,
        refetch: refetchUserData,
        isLoading: isUserLoading
    } = useGetUser({ isAuthenticated: false });
    const [user, setUser] = useState(null);

    const changeLangState = async (_locale: Langs) => {
        setLang(_locale);
        const dictionaries = { en, kr }
        setDictionary(dictionaries[_locale])
        // axios.defaults.headers['Accept-Language'] = _locale === 'en' ? 'en' : 'ko';
        await queryClient.invalidateQueries();
    };

    const changeLocale = async (_locale: Langs) => {
        changeLangState(_locale);
        localStorage.setItem("lang", _locale);
        isPcOnly && toast.success(_locale === 'en' ? 'Language updated successfully' : "언어가 성공적으로 업데이트되었습니다", {
            position: isPcOnly? "top-center" : "bottom-center"
        })
    };

    useEffect(() => {
        const lang: Langs = localStorage.getItem("lang") === 'en' ? 'en' : 'kr';
        changeLangState(lang)
    }, []);

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
            logger.log("login",lang)
            const data = await _login(props);
            if(data.status === UserStatus.Waiting) router.push("registration/waiting").then(() =>
                toast.info(dictionary?.signup?.waiting?.waiting_registration_toast))

            else if(data.status === UserStatus.Rejected) router.push("registration/rejected").then(() =>
                toast.error(dictionary?.signup?.deny?.reject_registration_toast))

            else if( data.status === UserStatus.Blocked)  toast.error(dictionary?.signup?.block?.block_toast)

            else {
                await localStorage.setItem("token", data.token);
                checkAuth();
                await localDataUpdated(data)
            }
            return data.status===UserStatus.Active
        } catch (error) {
            throw error
        }

    }, [lang,dictionary]);

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
        isAuthenticated: !!user,
        token,
        login,
        register,
        logout,
        lang,
        setLang,
        changeLocale,
        dictionary,
        loading: loading,
        isUserLoading: !user && isUserLoading,
        isRoleLoading: false,
        localDataUpdated,
        isPcOnly,
        isKorean : lang === 'kr'
    }), [
        lang,
        user,
        token,
        loading,
        dictionary,
        isUserLoading,
        isPcOnly,
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
