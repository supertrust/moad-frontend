import { IUser, IUserRole } from "./user";

export type LoginPropsType = {
    email?: string
    phone?:string
    username?: string
    password: string
    status? : number
}

export type ILoginResponse = {
    token: string
    status: number
}

export interface IRegisterResponse {
    token: string
}

export type RegisterPropsType = {
    email: string;
    password: string;
    confirm_password: string;
    company_name: string;
    company_phone_number: string;
    business_registration_number: string;
    employee_name: string;
    employee_phone_number: string;
    employee_email: string;
    sector: string | undefined;
    contact_position: string | undefined;
    business_license: any;
    verify_business_registration_number: boolean;
}
export type Langs = "kr" | "en"
export type Dictionary = Record<string, any>

export type AuthContextType = {
    isAuthenticated: boolean;
    login: (props: LoginPropsType) => Promise<boolean>;
    register: (props: RegisterPropsType) => Promise<boolean>;
    logout: () => Promise<void>;
    token: string | null;
    dictionary: Dictionary,
    lang: Langs,
    setLang: (lang: Langs) => {}
    user: IUser | null;
    userRole: IUserRole | null;
    loading: boolean,
    isUserLoading : boolean,
    isRoleLoading : boolean,
    localDataUpdated : VoidFunction
    changeLocale : (lang : Langs) => {}
    isPcOnly : boolean
}

export type VerifyInputPropsType = {
    key: string;
    value: string;
}

export type FindIdProps = {
    business_registration_number : string,
}

export type CheckUserProps = {
    email: string;
}

export type SendOTP = {
    email: string;
}

export type VerifyOTP = {
    email: string;
    otp: string;
}

export type ResetPasswordProps = {
    email: string;
    password: string;
    confirm_password: string;
}
