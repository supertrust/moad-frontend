import axios from "@src/utils/axios";
import {IVehicleLocationDetails, LogVehiclLocationProps, SaveLocationType} from "@src/types/map";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@src/services/ReactQueryClient";

export const useSaveLocation = () => useMutation<void, string, SaveLocationType>({
    mutationFn: async (props) => axios.post("/api/save-vehicle-location", props),
})

export const useVehicleLocationDetails = (cargo_vehicle_id: string)  => useQuery<IVehicleLocationDetails, string>({
    queryKey: ["vehicle-location", cargo_vehicle_id],
    queryFn: async () => (await axios.get(`/api/get-vehicle-location`,  { 
        params : { cargo_vehicle_id }
    })).data.data,
    enabled: !!cargo_vehicle_id
})

export const useLogVehicleLocation = () => useMutation<void, string, LogVehiclLocationProps>({
    mutationFn: async (props) => axios.post("/api/log-vehicle-location", props),
    onSuccess: () => queryClient.invalidateQueries(['vehicle-location'])
})