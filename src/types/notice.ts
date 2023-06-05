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
}

export interface INotification {
    id: number;
    title: string;
    content: string;
    created_at: Date;
}