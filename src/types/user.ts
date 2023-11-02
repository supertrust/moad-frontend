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
    role_id: number;
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

export type UpdateAdvertiserInfoType = {
    id: number;
    company_phone_no: string
    contact_phone_number: string
    contact_position: string
    manager: string
    contact_email: string
    memo ? : string
}

export type AddMemoProps = {
    user_id : number,
    content ?: string
}
export type BlockUserProps = {
    id : number,
    status : number,
    reason : string | undefined | null
}
export type GetAdvertiserPropsType = {
    id: number | undefined
}
export interface IAdvertiser {
    "id": number,
    "employee_email": string,
    "sector": string,
    "company_name": string,
    "company_phone_number": string,
    "manager": string,
    "contact_position": string,
    "contact_person_mobile_number": string,
    "contact_email": string,
    "total_ad_no": 0,
    "advertisement": string,
    "advertisements": [],
    "dormant_state": number,
    "company_registration_number": number,
    "company_registration_certificate": string,
    "registration_date": string,
    "member_history": []
}