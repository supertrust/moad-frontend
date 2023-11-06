export interface  IGetAdminStatisticsRes {
    type: string;
    status: string;
    data: {
        total_advertisers: number;
        total_adverts_within_week: number;
        advertiser_sign_up_count: number;
        advertiser_sign_up_count_within_week: number;
        advertiser_withdrawn_count: number;
        advertiser_withdrawn_count_within_week: number;
        advertiser_blacklist_count: number;
        advertiser_blacklist_count_within_week: number;
    };
};

interface StatisticsData {
    registration_date: string;
    status: string;
    total_cost: string;
    company_name: string;
    employee_email: string;
    sector: string;
    advertiser_id: number;
    in_progress: number;
    vehicle_count: number;
}

export interface IPostAdminStatisticsListRes {
    message: string;
    status: string;
    data: StatisticsData[]
};
