export interface IFaq {
    question: string;
    answer: string;
    type: {
        name : string
    }
    sort_order : null | number
}

export interface IFaqRes {
    data : IFaq[]
    totalRecords : number
}

export type GetFaqPropsType = {
    type: string
}
export interface CategoryDataType {
    id: number;
    name: string;
    type: string;
    deleteAble: boolean;
    author_id: number;
    created_at: string;
    updated_at: string;
}
export interface IGetCategoriesResp {
    data: CategoryDataType[]
}
export type CategoryType = "faq" | "notice" | "guide" | "inquiry"
