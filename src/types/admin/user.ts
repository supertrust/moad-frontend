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