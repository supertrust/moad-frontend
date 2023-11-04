export type PeriodeType = '' | 'today' | '1week' | '1month' | '3months' | '6months' 

export type AdStatusType = '' | 'applyingForAdvertisement' | 'adReviewing' | 'focusingOnRecruitingCargoOwners' | 'advertisementInProgress' | 'advertisementEnds' 

export type AdTypeType =  'fixed_ad' | 'national_ad' | 'spot_ad'

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
    advertisement_recruitment_period: string
    number_of_vehicles_recruited: number
    number_of_vehicles_in_operation: string
    advertisement_progress_status: string
    advertising_period: string
    advertisement_type: string
    advertising_area: number
    advertisement_application_date_and_time: string
}

export interface IAdVehicle {
    id: number,
    advertisement_id: number,
    vehicle_id: number
    number_of_vehicles: number
    price:  number
    created_at: string
    updated_at: string
    deleted_at: string,
    status: string
}

export interface IAdArea {
    id: number
    area: string
    created_at: string
    updated_at: string
    deleted_at: string,
    pivot: {
        advertisement_id: number,
        operating_area_id: number
    }
}

export interface IAdvertisementDetails  {
    id: number,
    ad_name: string
    sector: string,
    company_name: string
    company_phone_number: number,
    manager: string,
    content: string,
    business_registration_number: number,
    advertisement_recruitment_period_start: string
    advertisement_recruitment_period_end: string
    number_of_vehicles_recruited: number
    advertisement_progress_status: string
    advertising_period_start: string
    advertising_period_end: string
    advertisement_type: string,
    advertisement_vehicle_type: string,
    advertising_area: IAdArea[],
    advertisement_vehicle: IAdVehicle[],
    contact_phone_person: string,
    contact_position: string,
    contact_phone_number: number,
    contact_email: string
    advertisement_application_date_and_time: string
    advertisement_content: string
    advertising_cost: string,
    images: {
        id: number,
        advertisement_id: number,
        image_path: string,
        created_at: string,
        updated_at: string
    }[]
}

export type VehicleType = 'cargo' | 'tower' | 'loaded'

export type UpdateCompanyAdProps = {
    advertisement_id: string,
    ad_name: string
    company_phone_number: number,
    business_registration_number: string
    advertisement_recruitment_period_start: string
    advertisement_recruitment_period_end : string
    advertisement_progress_status: 'applying' | 'proceeding' | 'end'
    advertising_period_start: string
    advertising_period_end: string
    advertisement_type: AdTypeType
    advertisement_vehicle_type : VehicleType,
    advertising_area : number[],
    vehicle_details: { [key:string]: number},
    contact_phone_person: string,
    contact_phone_number: number,
    contact_email: string,
    contact_position: string,
    advertisement_content: string,
    advertising_cost: number,
    manager: string,
    number_of_vehicles_recruited: number
    image_1: {},
    image_2: {},
    image_3: {},
    image_4: {},
    image_5: {},
    image_6: {},
    image_7: {},
    image_8: {},
    image_9: {},
    image_10: {},
    image_12: {},
    image_13: {},
}