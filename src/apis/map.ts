import axios from "@src/utils/axios";
import {SaveLocationType} from "@src/types/map";
import { useMutation } from "@tanstack/react-query";

export const useSaveLocation = () => useMutation<void, string, SaveLocationType>({
    mutationFn: async (props) => axios.post("/api/save-vehicle-location", props),
})