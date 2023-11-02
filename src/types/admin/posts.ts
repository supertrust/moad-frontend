
export type PostType = 'pages' | 'notifications' | 'notices' | 'inquiry' | 'guides' | 'faqs'

export interface GetPostType {
    page: number,
    type?: PostType,
    from?: string,
    to?:string,
    search_term?: string,
    date_filter?: 'today' | 'week' | 'month' | 'threeMonth' | 'sixMonths'
}

export interface IPost {
    id: number
    types: string,
    title: string
    content: string
    author: string
    notice_registration_date: string
    inquiry_question: string
    inquiry_answer: string
    registration_date: string
    updated_date: string
}

export interface IGetPostResponse<T> {
    current_page: number
    data: T[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: {
        url: string
        label: string
        active: string
    }[],
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string
    to: number
    total: number
}