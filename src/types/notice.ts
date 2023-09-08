export type GetNoticesPropsType = {
    page: number;
}

export type GetNoticeDetailPropsType = {
    id: string
}

export interface INotice {
    id: number;
    title: string;
    content: string;
    image: string | null;
    important: boolean;
    created_at: string | null;
}

export interface INoticeDetail {
    id: number;
    title: string;
    content: string;
    image: string | null;
    important: boolean;
    created_at: string | null;
    prev: number | null;
    next: number | null;
}

export interface INotification {
    id: number,
    user_id: number,
    title: string,
    content: string
    status: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
    user: {
        id: number,
        email: string
        phone_number: string,
        otp: number,
        role_id: number,
        profile_img: string,
        created_at: string,
        updated_at: string,
        deleted_at: string,
        status: number
    }
}

export interface  INotificationResponse {
    current_page: number,
    data: INotification[],
    first_page_url: string,
    from: string,
    last_page: 1,
    last_page_url: string,
    links: {
        url: string,
        label: string,
        active: boolean
    }[],
    next_page_url: string,
    path:string,
    per_page: number,
    prev_page_url: string,
    to: string,
    total: number
}