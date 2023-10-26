export interface LoginProps  {
    username: string
    password: string
}

export interface IAdminAuth  {
    id: number
    username: string
    email: string
    access: string,
    role_id: number
    status: string,
    created_at: string
    updated_at: string
    deleted_at: string
    token: string
    type: string
}