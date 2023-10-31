

export interface IUserStats  {
    total_vehicles: number,
    scheduled_to_end_total: number,
    in_operation: number,
    terminated: number,
    scheduled_to_run: number,
    total_cost_for_current_month: number
}


export type Timeframe = 'today' | 'yesterday' | 'this_week' | 'this_month' | 'last_30_days' | 
                        'last_7_days' | 'last_month' | 'last_week' | 'entire' ;

export interface GetAdvertisementStatProps {
    timeframe?: string
    advertisement_id : number
}

export interface IAdvertisementStat {
    id: number,
    advertiser_id: number,
    ad_name: string,
    type: string,
    ad_period: number,
    start_date: string,
    end_date: string,
    status: string,
    total_cost: number,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    approved: string
}

export interface GetVehicleTotalOperatingDataProps{
    id: number,
    route_no: number
}

export interface GetVehiculeTotalOperatingData<T> {
    headers : Object,
    original : T[],
    exception:  null
}

export interface IVehicleTotalHours {

}

export interface IVehicleTotalDistanceCovered {

}