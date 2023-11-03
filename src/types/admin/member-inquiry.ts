export type AdminAdList = {
    id: number;
    advertiser_id: number;
    ad_name: string;
    type: string;
    ad_period: number;
    start_date: string;
    end_date: string;
    status: string;
    total_cost: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    approved: string;
    content: string;
    advertisement_vehicles : {
        vehicles :{
        vehicle_type : string
    }}[]
};


export interface MemberInquiry {
    company_name: string;
    company_phone_number: string;
    contact_person_mobile_number: string | null;
    contact_position: string | null;
    employee_email: string;
    id: number;
    manager: string | null;
    sector: string;
    advertisements : AdminAdList[]
};



export interface AdminMemberInquiryListRes {
    data : MemberInquiry[];
    message : string;
    status : string

}