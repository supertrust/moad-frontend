export type GetCompanyAdListType = {
    page: number, 
}   

export interface ICompanyAdList {
    id: number,
    ad_name: string,
    sector: string,
    company_name: string,
    recruitment_period: string
    number_of_vehicle_recruited: number
    number_of_vehicle_in_operation: number
}