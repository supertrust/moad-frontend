import { API_URL } from "@src/apis/urls";
import axios from "@src/utils/axios";
import {FinishRideProps, IVehicleLocationDetails, LogVehiclLocationProps, SaveLocationType, SaveRideResponse} from "@src/types/map";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@src/services/ReactQueryClient";

export const useSaveLocation = () => useMutation<SaveRideResponse, string, SaveLocationType>({
    mutationFn: async (props) => (await axios.post(API_URL.saveVehicleLocation(), props)).data.data,
})

export const useVehicleLocationDetails = (cargo_vehicle_id: string, date_filter: string | null )  => useQuery<IVehicleLocationDetails, string>({
    queryKey: ["vehicle-location", cargo_vehicle_id,date_filter],
    queryFn: async () => (await axios.get(API_URL.getVehicleLocation(),  {
        params : { cargo_vehicle_id, date_filter }
    })).data.data,
    enabled: !!cargo_vehicle_id
})

export const useAllVehicleLocationDetails = (cargo_vehicle_id: string, date_filter: string | null )  => useQuery<IVehicleLocationDetails[], string>({
    queryKey: ["all-vehicle-location", cargo_vehicle_id,date_filter],
    queryFn: async () => (await axios.get(API_URL.getAllVehicleLocation(),  {
        params : { cargo_vehicle_id, date_filter }
    })).data.data,
    enabled: !!cargo_vehicle_id,
    retry: 0,
})

export const useAllAdvertisementVehicleLocationDetails = (advertisment_id: string| number | undefined,date_filter: string | null )  => useQuery<any[], string>({
    queryKey: ["all-advertisement-vehicle-location",date_filter],
    queryFn: async () => (await axios.get(API_URL.getAdvertiserAllVehicleLocation(),  {
        params : {  date_filter,advertisment_id }
    })).data.data,
    retry: 0,
    enabled : !!advertisment_id
})

export const useAllVehicleLocationDate = (cargo_vehicle_id: string )  => useQuery<string[], string>({
    queryKey: ["all-vehicle-location", cargo_vehicle_id],
    queryFn: async () => (await axios.get(API_URL.getAllVehicleLocationDate(),  {
        params : { cargo_vehicle_id }
    })).data.data,
    enabled: !!cargo_vehicle_id,
    retry: 0,
})

export const useGetAdvertisementAllVehicleLocationDate = (advertisement_id: string )  => useQuery<string[], string>({
    queryKey: ["ad-all-vehicle-location", advertisement_id],
    queryFn: async () => (await axios.get(API_URL.getAllAdVehicleLocationDate(),  {
        params : { advertisement_id }
    })).data.data,
    enabled: !!advertisement_id,
    retry: 0,
})

export const useLogVehicleLocation = () => useMutation<void, string, LogVehiclLocationProps>({
    mutationFn: async (props) => axios.post(API_URL.postLogVehicleLocation(), props),
    onSuccess: (_, { cargo_vehicle_id }) => queryClient.invalidateQueries(['vehicle-location', cargo_vehicle_id])
})

export const useFinishVehicleRide = () => useMutation<void, string, FinishRideProps>({
    mutationFn: async (props) => axios.post(API_URL.postVehicleFinishRide(), props),
    // onSuccess: (_, { cargo_vehicle_id }) => queryClient.invalidateQueries(['vehicle-location', cargo_vehicle_id])
})
