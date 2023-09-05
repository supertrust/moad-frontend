export interface IUser {
    business_license: string;
    business_registration_number: string;
    company_name: string;
    company_phone_number: string;
    email: string;
    employee_email: string;
    employee_name: string;
    employee_phone_number: string;
    id: number
    sector: string;
    role: "Advertiser" | "Admin" | "Cargo";
    image: string;
}

export type GetUserPropsType = {
    isAuthenticated: boolean
}

export type GetUserRolePropsType = {
    isAuthenticated: boolean
}

export interface IUserRole {
    id: number;
    role_name: "Advertiser" | "Admin" | "Cargo";
    created_at: null | string;
    updated_at: null | string;
}

export type ChangePasswordPropsType = {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

export type UpdateUserInfoType = {
    company_name: string
    company_phone_number: string
    business_registration_number: string
    employee_phone_number: string
    employee_email: string
    sector: string
    business_license: null | File;
}
