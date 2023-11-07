export type UserStatusType = 'active' | 'inactive'
export type UserAccessType = 'admin' | 'manager' | 'staff';
export type UserDivisionType  = 'full_time_job' | 'contract_job'

export type UpdateAdvetiserUserProps = {
    advertiser_id: number,
    status: UserStatusType
    id_number: number
    company_phone_number: number
    name: string
    username: string
    email: string
    password: string
    confirm_password: string
    department: string
    access: UserAccessType
    division: UserDivisionType
    phone_number: number
    mobile_phone: number
    push_notification: string
    registrants: string
}


export interface IAdminUserDetails {
    id: number
    username: string,
    email: string
    access: string,
    role_id: number
    status: string,
    created_at:  string
    updated_at: string
    deleted_at: string,
    name: string
    id_number: number
    department: string
    phone_number: number
    mobile_phone: number
    division: string,
    registrants: string,
    push_notification: string
}