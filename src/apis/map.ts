import axios from "@src/utils/axios";
import {FinishRideProps, IVehicleLocationDetails, LogVehiclLocationProps, SaveLocationType, SaveRideResponse} from "@src/types/map";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@src/services/ReactQueryClient";

export const useSaveLocation = () => useMutation<SaveRideResponse, string, SaveLocationType>({
    mutationFn: async (props) => (await axios.post("/api/save-vehicle-location", props)).data.data,
})

export const useVehicleLocationDetails = (cargo_vehicle_id: string, date_filter: string | null )  => useQuery<IVehicleLocationDetails, string>({
    queryKey: ["vehicle-location", cargo_vehicle_id,date_filter],
    queryFn: async () => (await axios.get(`/api/get-vehicle-location`,  {
        params : { cargo_vehicle_id, date_filter }
    })).data.data,
    enabled: !!cargo_vehicle_id
})

export const useLogVehicleLocation = () => useMutation<void, string, LogVehiclLocationProps>({
    mutationFn: async (props) => axios.post("/api/log-vehicle-location", props),
    onSuccess: (_, { cargo_vehicle_id }) => queryClient.invalidateQueries(['vehicle-location', cargo_vehicle_id])
})

export const useFinishVehicleRide = () => useMutation<void, string, FinishRideProps>({
    mutationFn: async (props) => axios.post("/api/vehicle-finish-ride", props),
    // onSuccess: (_, { cargo_vehicle_id }) => queryClient.invalidateQueries(['vehicle-location', cargo_vehicle_id])
})
