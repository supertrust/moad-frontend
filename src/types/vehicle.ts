export type GetVehicleDetailsPropsType = {
    advertisement_id: string;
    cargo_vehicle_id: string
}

export interface GetVehicleDetailsResponseType {
    average_daily_hours_operation: number;
    car_number: string;
    cargo_id: number;
    created_at: string;
    daily_avg_drive_time: string;
    deleted_at: string | null;
    destination: string | null;
    end_point: string;
    estimated_driving_distance: number | null;
    fixed_destination: string;
    fixed_origin: string | null;
    id: number;
    monthly_avg_operating_days: number;
    pivot: {
        advertisement_id: number;
        cargo_vehicle_id: number;
    };
    start_point: string;
    status: string;
    total_mileage: number | null;
    updated_at: string;
    vehicle: {
        id: number;
        vehicle_type: string;
        vehicle_standard: string;
        expenses: any;
        created_at: string | null;
    };
    vehicle_id: number;
}
