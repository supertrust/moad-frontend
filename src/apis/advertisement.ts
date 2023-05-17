import axios from "@src/utils/axios";
import { GetAdvertisementDetailPropType, GetAdvertisementOperationAreaPropsType, GetAdvertisementVehiclesPropsType, GetAdvertisementsPropType, IAdvertisement, IAdvertisementOperatingArea, IAdvertisementVehicle, IOperatingArea, IVehicle, SaveAdvertisementType } from "@src/types/advertisement";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAdvertisements = (props: GetAdvertisementsPropType = {}) => useQuery<IAdvertisement[], string>({
    queryKey: ["advertisements", ...Object.values(props)],
    queryFn: async () => (await axios.get("/api/get-advertisement", { params: props })).data.data
})

export const useGetAdvertisementDetail = (props: GetAdvertisementDetailPropType) => useQuery<IAdvertisement, string>({
    queryKey: ["advertisement-detail", props.id],
    queryFn: async () => (await axios.get("/api/get-advertisement", { params: { id: props.id } })).data.data?.[0]
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

export const useGetAdvertisementVehicles = ({ advertisement_id }: GetAdvertisementVehiclesPropsType) =>
    useQuery<IAdvertisementVehicle[], string>({
        queryKey: ["advertisement-vehicles", advertisement_id],
        queryFn: async () => (await axios.get("/api/get-advehicles", { params: { advertisement_id } })).data.data,
        enabled: !!advertisement_id
    })

export const useGetAdvertisementOperationArea = ({ advertisement_id }: GetAdvertisementOperationAreaPropsType) =>
    useQuery<IAdvertisementOperatingArea[], string>({
        queryKey: ["advertisement-operation-area", advertisement_id],
        queryFn: async () => (await axios.get(`/api/get-advertisement-operating-area/${advertisement_id}`)).data.data,
        enabled: !!advertisement_id
    })

export const useDeleteAdvertisement = () => useMutation<void, string, { id: string }>({
    mutationFn: async ({ id }) => await axios.delete(`/api/delete-advertisement/${id}`)
})
