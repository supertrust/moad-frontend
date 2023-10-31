export type PeriodeType = 'all' | 'today' | '1week' | '1month' | '3months' | '6months'

export type AdStatusType = 'entire' | 'applyingForAdvertisement' | 'adReviewing' | 'focusingOnRecruitingCargoOwners' | 'advertisementInProgress' | 'advertisementEnds'

export type AdTypeType = 'entire' | 'fixed_ad' | 'national_ad' | 'spot_ad'

export type GetCompanyAdListType = {
    page: number, 
    adPeriod: PeriodeType,
    startDateAdPeriod?: string,
    endDateAdPeriod?: string,
    adApplication : PeriodeType,
    startDateAdApplication?: string,
    endDateAdApplication? : string,
    adStatus?: AdStatusType[],
    adType?: AdTypeType[],
    adSearchBy: 'terms' | 'ad_name' | 'company_name',
    adSearch?: string
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