import { number } from "yup";

export type AdTypesType = "national_ad" | "spot_ad" | "fixed_ad";
export type AdStatusesType = "proceeding" | "applying" | "end";

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
    },
    operating_area: number[];
    total_cost: number;
    status: string;
    end_date: string;
};

export interface IAdvertisement {
    ad_name: string;
    ad_period: number;
    advertiser_id: number;
    amount: number;
    email: null | string;
    end_date: string;
    id: number;
    start_date: string;
    status: "proceeding"
    total_cost: number;
    approved: "yes" | "no",
    type: "fixed_ad" | "national_ad" | "spot_ad";
    number_of_vehicles: number;
    advertiser: {
        business_license: string;
        business_registration_number: string;
        company_name: string;
        company_phone_number: string;
        employee_email: string;
        employee_name: string;
        employee_phone_number: string;
        id: number;
        sector: string;
    }
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