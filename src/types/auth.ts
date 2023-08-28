import { IUser, IUserRole } from "./user";

export type LoginPropsType = {
    email: string;
    password: string;
}

export type ILoginResponse = {
    token: string
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
    business_license: any;
    verify_business_registration_number: boolean;
}

export type AuthContextType = {
    isAuthenticated: boolean;
    login: (props: LoginPropsType) => Promise<void>;
    register: (props: RegisterPropsType) => Promise<boolean>;
    logout: () => Promise<void>;
    token: string | null;
    user: IUser | null;
    userRole: IUserRole | null;
    loading: boolean
}

export type VerifyInputPropsType = {
    key: string;
    value: string;
}

export type FindIdProps = {
    company_name: string,
    company_phone_number: string,
}

export type CheckUserProps = {
    email: string;
    company_name: string;
    company_phone_number: string;
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
