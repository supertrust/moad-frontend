export type VehicleLocationState = 'running' | 'stopped' | 'finish' | 'service'

export type SaveLocationType = {
    cargo_vehicle_id: number,
    cargo_to_advertisement_id: number,
    starting_point: string,
    end_point: string,
    start_time:string,
    end_time?:string,
    is_active: VehicleLocationState,
    current_point: string,
    current_point_name?: string,
    passing_vehicle_up?: string
    passing_vehicle_descent?: string
}

export type IVehicleLocationDetails = {
    id: number,
    cargo_vehicle_id: number,
    cargo_to_advertisement_id: number,
    route_no: string,
    starting_point: string,
    end_point: string,
    start_time: string,
    end_time: string,
    passing_vehicle_descent: string,
    passing_vehicle_up: string,
    current_point_name: string,
    current_point: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    is_active: VehicleLocationState,
    todayDistance: number,
    totalDistance: number,
    avarageMonthlyDistane: number
}

export type LogVehiclLocationProps = {
    cargo_vehicle_id: number,
    current_point: string,
    current_point_name: string,
    passing_vehicle_up: string,
    passing_vehicle_descent: string
}