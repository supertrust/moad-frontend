export type KakaoNavigationContextType = {
    getDirection : (origin: string, destination: string ) => void
}


export type Priority = 'DISTANCE' | 'RECOMMEND' | 'TIME';

export type GetDirectionType = {
    origin: string,
    destination: string,
    waypoints?: string,
    priority?: Priority,
    avoid?: string,
    alternatives?: boolean,
    road_details?: boolean,
    car_type?: number,
    car_fuel?: number,
    car_hipass?: boolean
    summary?: boolean
}


export interface ILocation {
    name?: string ,
    x: number,
    y: number
}

export interface IBound {
    min_x: number,
    min_y: number,
    max_x: number,
    max_y: number
}

export interface IGetDirection {
    trans_id: string,
    routes:{
        result_code: number,
        result_msg: string,
        summary: {
            origin: ILocation,
            destination: ILocation,
            waypoints: [],
            priority: string,
            bound: IBound,
            fare: {
                taxi: number,
                toll: number
            },
            distance: number,
            duration: number
        },
        sections:{
            distance: number,
            duration: number,
            bound: IBound,
            roads: {
                name: string,
                distance: number,
                duration: number,
                traffic_speed: number,
                traffic_state: number,
                vertexes: number[]
            }[],
            guides: {
                name: string,
                x: number
                y: number,
                distance: number,
                duration: number,
                type: number,
                guidance: string,
                road_index: number
            }[]
        }[]
    }[]
}

export type MultipleStopDirectionProps = {
    origin: ILocation,
    destination: ILocation,
    waypoints? : ILocation[],
    priority?: Priority
    avoid?: string[]
    alternatives?: boolean
    road_details?: boolean
    car_type?: number
    car_fuel?: string
    car_hipass?: boolean
    summary?: boolean
}

export type ISearchResult = {
    documents: {
        address: {
            address_name: string,
            b_code: number,
            h_code: number,
            main_address_no: number,
            mountain_yn: string,
            region_1depth_name: string,
            region_2depth_name: string,
            region_3depth_h_name: string,
            region_3depth_name: string,
            sub_address_no: string,
            x: number,
            y: number
        },
        address_name: string,
        address_type: string,
        road_address: {
            address_name: string,
            building_name: string,
            main_building_no: number,
            region_1depth_name: string,
            region_2depth_name: string,
            region_3depth_name: string,
            road_name: string,
            sub_building_no: string,
            underground_yn: string,
            x: number,
            y: number,
            zone_no: number
        },
        x: number,
        y: number
    }[],
    meta: {
      is_end: boolean,
      pageable_count: number,
      total_count: number
    }
}


export type IPlaceSearchResult = {
    meta: {
        same_name: {
            region: string[],
            keyword: string,
            selected_region: string
        },
        pageable_count: number,
        total_count: number,
        is_end: boolean
    },
    documents: {
        place_name: string,
        distance: number,
        place_url: string,
        category_name: string,
        address_name: string,
        road_address_name: string,
        id: number,
        phone: string,
        category_group_code: string ,
        category_group_name: string,
        x: number,
        y: number
    }[]
}