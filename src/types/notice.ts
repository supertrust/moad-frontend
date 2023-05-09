export type GetNoticesPropsType = {
    page: number;
}

export type GetNoticeDetailPropsType = {
    id: string
}

export interface INotice {
    id: string;
    important: boolean;
    date: string;
    title: string;
}

export interface INoticeDetail {
    prev: string | null;
    next: string | null;
    content: {
        important: boolean;
        id: string;
        content: string;
        date: string;
        image: string;
        title: string;
    }
}