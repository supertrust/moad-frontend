export type GetInquiriesPropsType = {
    page: number
}

export type GetInquiryDetailPropsType = {
    id: string
}

export type DeleteInquiryPropsType = {
    id: string
}

export interface IGetInquiriesResponse {
    current_page: number;
    data: IInquiry[]
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null,
        label: string;
        active: boolean;
    }[]
    next_page_url: string | null,
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface IInquiry {
    id: number;
    user_id: number;
    inquiry_type: "classification_of_payment" | "error" | "usage_inquiry" | "member_related";
    inquiry_title: string;
    inquiry_question: string;
    inquiry_answer: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null,
    documents: {
        question: string[]
        answer: string[]
    }
}

export interface IInquiryDetail {
    id: number;
    user_id: number;
    inquiry_type: "classification_of_payment" | "error" | "usage_inquiry" | "member_related";
    inquiry_title: string;
    created_at: string;
    inquiry_question: string;
    inquiry_answer: string;
    deleted_at: string | null;
    updated_at: string;
    prev: number | null;
    next: number | null;
    documents: {
        question: string[];
        answer: string[];
    }
}

export type UpdateInquiryType = {
    id: string;
    inquiry_title: string;
    inquiry_type: "classification_of_payment" | "error" | "usage_inquiry" | "member_related";
    inquiry_question: string;
    inquiry_answer: string;
    inquiry_documents: File | null
}

export type SaveInquiryType = {
    inquiry_title: string;
    user_id: number;
    inquiry_type: "classification_of_payment" | "error" | "usage_inquiry" | "member_related";
    inquiry_question: string;
    inquiry_documents: File | null
}