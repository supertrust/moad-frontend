
export type CargoAdvertismentListProps = {
    
}

export interface IAdVehicule {
    id: number,
    advertisement_id: number,
    vehicle_id: number,
    number_of_vehicles: number,
    price: number,
    vehicles_type: string,
    vehicle_standard: string,
    taken_vehicle_count: number,
    available_vehicle_count: number
}

export type AssignAdvertismentStatus = "accepted" | "apply" | "rejected" ;
export interface ICargoAdvertisement  {
    id: number,
    advertiser_id: number,
    ad_name: string,
    type: string,
    start_date: string,
    email: string,
    end_date: string,
    status: AssignAdvertismentStatus,
    total_cost: string,
    ad_period: number,
    approved: string,
    total_vehicles_operation: number,
    vehicle_number_count: number,
    advertisement_vehicles: IAdVehicule[]
}

export type AssignAdvertismentToCargoProps = { 
    advertisement_id: number
    vehicle_id : number
    type: string
    status: AssignAdvertismentStatus
}
