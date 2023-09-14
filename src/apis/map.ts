import axios from "@src/utils/axios";
import {IVehicleLocationDetails, SaveLocationType} from "@src/types/map";
import { useMutation, useQuery } from "@tanstack/react-query";

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