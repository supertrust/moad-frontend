import axios from "@src/utils/axios";
import { GetAdvertisementsPropType, IAdvertisement, IOperatingArea, IVehicle, SaveAdvertisementType } from "@src/types/advertisement";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAdvertisements = (props: GetAdvertisementsPropType = {}) => useQuery<IAdvertisement[], string>({
    queryKey: ["advertisements", ...Object.values(props)],
    queryFn: async () => (await axios.get("/api/get-advertisement", { params: props })).data.data
})

export const useGetVehicles = () => useQuery<IVehicle[], string>({
    queryKey: ["vehicles"],
    queryFn: async () => (await axios.get("/api/get-vehicle-list")).data.data
})

export const useGetOperatingAreas = () => useQuery<IOperatingArea[], string>({
    queryKey: ["operating-areas"],
    queryFn: async () => (await axios.get("/api/get-operatingArea")).data.data
})

export const useSaveAdvertisement = () => useMutation<IAdvertisement, string, SaveAdvertisementType>({
    mutationFn: async (props) => (await axios.post("/api/save-advertisement", props)).data.data
})