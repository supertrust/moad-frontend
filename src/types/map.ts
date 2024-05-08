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
    today_distance: number,
    total_distance: number,
    avarageMonthlyDistance: number
    logs: {location:string, created_at : string}[]
}

export type LogVehiclLocationProps = {
    cargo_vehicle_id: number,
    current_point: string,
    current_point_name: string,
    passing_vehicle_up: string,
    passing_vehicle_descent: string,
}

export type FinishRideProps = {
    cargo_vehicle_location_id: number,
    end_point: string,
    end_time: string,
    is_active: VehicleLocationState
}

export type SaveRideResponse =  {
    cargo_vehicle_id: number,
    cargo_to_advertisement_id: number,
    starting_point: string,
    end_point: string,
    start_time: string,
    end_time: string,
    current_point: string ,
    is_active: string,
    current_point_name: string,
    passing_vehicle_descent: number,
    passing_vehicle_up: number,
    route_no: string,
    logs: {
        location: string,
        name: string,
        passing_up: number,
        passing_descent: 0,
        created_at: string
    }[],
    updated_at: string
    created_at: string
    id: number,
    vehicle: {
        id: number,
        registration_number: string,
        cargo_id: number,
        created_at: string,
        updated_at: string,
        deleted_at: null,
        vehicle_id: number,
        monthly_avg_operating_days: number,
        daily_avg_drive_time: number,
        car_number: string,
        destination: string,
        total_mileage: string,
        estimated_driving_distance: string,
        start_point: string,
        end_point: string
        fixed_origin: string,
        fixed_destination: string,
        status: string,
        average_daily_hours_operation: number
    }
}