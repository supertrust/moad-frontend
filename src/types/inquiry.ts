export type GetInquiriesPropsType = {
    page: number
}

export type GetInquiryDetailPropsType = {
    id: string
}

export type DeleteInquiryPropsType = {
    id: string
}

export interface IInquiry {
    inquiry_question: string;
    inquiry_answer: string;
    inquiry_title: string;
    id: string;
    created_at: string;
    inquiry_type: "classification_of_payment" | "error" | "usage_inquiry" | "member_related";
    documents: {
        question: string[];
    }

}

export interface IInquiryDetail {
    inquiry_type: "classification_of_payment" | "error" | "usage_inquiry" | "member_related";
    inquiry_title: string;
    created_at: string;
    inquiry_question: string;
    inquiry_answer: string;
    updated_at: string;
    prev: number | null;
    next: number | null;
    documents: {
        question: string[];
        answer: string[];
    }
} 