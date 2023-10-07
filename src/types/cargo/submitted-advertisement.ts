

export type ISubmittedAdvertisementResponse = {
    id: number,
    advertiser_id: number,
    ad_name: string
    type: string,
    start_date: string,
    end_date: string,
    status: string,
    total_cost: number,
    ad_period: number,
    approved: string,
    cargo_to_advertisers: number,
    cargo_vehicle_id: number
  }

export type GetUserPropsType = {
    isAuthenticated: boolean
}