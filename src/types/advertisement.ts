import { number } from "yup";

export type AdTypesType = "national_ad" | "spot_ad" | "fixed_ad";
export type AdStatusesType = "in_progress" | "proceeding" | "applying" | "end";
export type AdVehicleType= "cargo" | "tower" | "loaded"

export type GetAdvertisementsPropType = {
    type?: AdTypesType;
    status?: AdStatusesType;
    for_admin?: boolean;
}

export type GetAdvertisementDetailPropType = {
    id: string;
}
export interface IVehicle {
    created_at: null | string;
    deleted_at: null | string;
    updated_at: null | string;
    expenses: { [key: number]: number }
    id: number
    vehicle_standard: string
    vehicle_type: string;
}

export interface IOperatingArea {
    area: string;
    created_at: null | string;
    deleted_at: null | string;
    id: number;
    updated_at: null | string;
}

export type SaveAdvertisementType = {
    ad_name: string;
    ad_period: number;
    type: string;
    start_date: string;
    vehicle_details: {
        [key: number]: number
    } | string,
    operating_area: number[] | string;
    total_cost: number;
    status: string;
    end_date: string;
    image_1?: string | FormData;
};

export interface IAdvertisementData {
    data : IAdvertisement[]
}

interface AdvertisementImage  {
    id: number,
    advertisement_id: number,
    image_path: string,
    completed_url : string,
    created_at: string,
    updated_at: string
}

export interface DraftAdvertisementImage extends AdvertisementImage {
    status: 'draft'
}
export interface IAdvertisement {
    id: number,
    advertiser_id: number,
    ad_name: string
    type: AdTypesType,
    start_date: string
    recruitment_period_start_date: string
    recruitment_period_end_date: string
    email: string,
    end_date: string
    status: AdStatusesType,
    total_cost:  number
    ad_period: number
    amount: number,
    number_of_cargo: number
    number_of_vehicles: string
    vehicle_type: AdVehicleType
    approved: "yes" | "no",
    situation: string,
    content: string,
    operating_areas: string[]
    vehicles_in_operation:   {
        number_of_vehicles: number,
        vehicle_type: string
    }[]
    images: AdvertisementImage[]
  }

export type GetAdvertisementVehiclesPropsType = {
    advertisement_id: string;
}

export type GetAdvertisementOperationAreaPropsType = {
    advertisement_id: string;
}

export interface IAdvertisementVehicle {
    id: number;
    advertisement_id: number;
    vehicle_id: number;
    number_of_vehicles: number;
    price: number;
    cargo_status:{
        advertisement_id:number;
        cargo_vehicle_id:number;
    }
    vehicles: {
        id: number;
        vehicle_type: string;
        vehicle_standard: string
        expenses: number[];
    };
    advertisement: IAdvertisement & {
        advertisement_vehicles: {
            id: number;
            advertisement_id: number;
            vehicle_id: number;
            number_of_vehicles: number;
            price: number;
            created_at: string;
            updated_at: string;
            deleted_at: null | string;
            status: string;
        }[];
    }
}

export interface IAdvertisementOperatingArea {
    id: number;
    area: string;
    created_at: null | string;
    updated_at: null | string;
    deleted_at: null | string;
    pivot: {
        advertisement_id: number;
        operating_area_id: number;
    }
}

export type UpdateAdvertisementStatusType = {
    id: number;
    status: "yes" | "no"
}

export type GetAdvertisementCargoPropsType = {
    advertisement_id: string;
    status?: string,
    page?: number
}

export type IAdvertisementCargo =  {
    id: number,
    registration_number: string,
    cargo_vehicle_id: number,
    advertisement_id: number,
    type: string,
    status: string,
    deleted_at: string,
    created_at: string,
    updated_at: string,
    vehicle: {
      id: number,
      vehicle_type: string,
      vehicle_standard: string,
      expenses: Object,
      created_at: string,
      updated_at: string,
      deleted_at: string
    }
}

export type VehicleAdvertisementStatsResponse = {
    data : VehicleAdvertisementStatsDetails[]
    totalRecords: number
}
export type VehicleAdvertisementStatsDetails = {
    cargo_vehicle_id: number,
    registration_number: string,
    vehicle_type: string,
    total_distance: number,
    total_hours: number,
    achievement_rate: string,
    status: string,
    start_date: string,
    end_date: string
}

export type IAdvertissementCargoResponse = {
    message: string
    per_page: number
    status: string
    currentPage: number
    totalPages: number
    totalRecords: number
    data: IAdvertisementCargo[]
}

export type GetCargoImageListProps = {
    advertisement_id: number
    cargo_vehicle_id: number
}
export type GetTotalAdvertisementStatProps = {
    start_date: Date | string
    end_date: Date | string
}

export type ICargoImage = {
    id: number,
    advertisement_id: number,
    cargo_vehicle_id: number,
    image_title: string,
    image_thumbnail: string,
    image_path: string,
    created_at: string,
    updated_at: string
  }


export type IAdvertisementStat ={
    id?:number,
    ad_type: string,
    ad_name: string,
    number_of_vehicle: number,
    total_distance: number,
    total_hours: number,
    status: AdStatusesType
}

export type ITotalAdvertisementStat = {
    advertisement_amount: number,
    all_vehicles: number,
    operating_vehicles: number,
    schedule: number,
    schedule_to_end: number,
    end: number
  }
