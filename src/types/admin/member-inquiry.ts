export interface MemberInquiry {
    company_name: string;
    company_phone_number: string;
    contact_person_mobile_number: string | null;
    contact_position: string | null;
    employee_email: string;
    id: number;
    manager: string | null;
    sector: string;
};

export interface AdminMemberInquiryListRes {
    data : MemberInquiry[];
    message : string;
    status : string

}