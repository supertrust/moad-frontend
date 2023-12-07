import { GetVehicleDetailsPropsType, GetVehicleDetailsResponseType } from "@src/types/vehicle";
import axios from "@src/utils/axios";
import {
    AdStatusesType,
    GetAdvertisementCargoPropsType,
    GetAdvertisementDetailPropType,
    GetAdvertisementOperationAreaPropsType,
    GetAdvertisementVehiclesPropsType,
    GetAdvertisementsPropType,
    GetCargoImageListProps,
    IAdvertisement,
    IAdvertisementData,
    IAdvertisementOperatingArea,
    IAdvertisementStat,
    IAdvertisementVehicle,
    IAdvertissementCargoResponse,
    ICargoImage,
    IOperatingArea,
    ITotalAdvertisementStat,
    IVehicle,
    SaveAdvertisementType,
    UpdateAdvertisementStatusType,
    DraftAdvertisementImage,
    VehicleAdvertisementStatsResponse,
    GetTotalAdvertisementStatProps
} from "@src/types/advertisement";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@src/services/ReactQueryClient";

export const useGetAdvertisements = (props: GetAdvertisementsPropType = {}) =>
    useQuery<IAdvertisementData, string>({
        queryKey: ["advertisements", ...Object.values(props)],
        queryFn: async () =>
            (await axios.get("/api/get-advertisement", { params: props })).data,
    });

export const useGetAdvertisementDetail = (
    props: GetAdvertisementDetailPropType
) =>
    useQuery<IAdvertisement, string>({
        queryKey: ["advertisement-detail", props.id],
        queryFn: async () =>
            (await axios.get("/api/get-advertisement", { params: { id: props.id } }))
                .data.data?.[0],
    });
export const useGetAdvertisementAllDetail = ({
                                                 advertisement_id,
                                             }: GetAdvertisementOperationAreaPropsType) => {
    return useQuery<IAdvertisementOperatingArea[], string>({
        queryKey: ["advertisement-all-detail", advertisement_id],
        queryFn: async () =>
            (
                await axios.get(
                    `/api/get-all-advertisement-vehicles/${advertisement_id}`
                )
            ).data.data,
    });
};

export const useGetVehicleDetail = ({
                                        advertisement_id,
                                        cargo_vehicle_id
                                    }: GetVehicleDetailsPropsType) => {
    return useQuery<GetVehicleDetailsResponseType, string>({
        queryKey: ["vehicle-detail", advertisement_id,cargo_vehicle_id],
        queryFn: async () =>
            (
                await axios.get(
                    `/api/get-detail-advertisement-vehicles?advertisement_id=${advertisement_id}&cargo_vehicle_id=${cargo_vehicle_id}`
                )
            ).data.data,
        enabled : !!cargo_vehicle_id && !!advertisement_id
    });
};

export const useGetAdvertisementImages = ({
                                              advertisement_id,
                                          }: GetAdvertisementOperationAreaPropsType) =>
    useQuery<IAdvertisementOperatingArea[], string>({
        queryKey: ["advertisement-images", advertisement_id],
        queryFn: async () =>
            (await axios.get(`/api/show-cargo-pictures?id=${advertisement_id}`)).data
                .data,
        enabled : !!advertisement_id
    });

export const useGetVehicles = () =>
    useQuery<IVehicle[], string>({
        queryKey: ["vehicles"],
        queryFn: async () => (await axios.get("/api/get-vehicle-list")).data.data,
    });

export const useGetOperatingAreas = () =>
    useQuery<IOperatingArea[], string>({
        queryKey: ["operating-areas"],
        queryFn: async () => (await axios.get("/api/get-operatingArea")).data.data,
    });

export const useSaveAdvertisement = () =>   useMutation<IAdvertisement, string, SaveAdvertisementType>({
    mutationFn: async (props) =>{
        const formData = new FormData();
        Object.entries(props).forEach(([key, value]) =>
            !!value && formData.append(key, value as string | Blob)
        );
        return(await axios.post("/api/save-advertisement", formData, {
            headers: { "Content-Type": "multipart/form-data"}
        })).data.data},
    onSuccess: () => {
        queryClient.invalidateQueries(["advertisements"] , {exact : false})
        queryClient.invalidateQueries(["advertisement-vehicles-stats"])
    }
});

export const useGetAdvertisementVehicles = ({
                                                advertisement_id,
                                            }: GetAdvertisementVehiclesPropsType) =>
    useQuery<IAdvertisementVehicle[], string>({
        queryKey: ["advertisement-vehicles", advertisement_id],
        queryFn: async () =>
            (await axios.get("/api/get-advehicles", { params: { advertisement_id } }))
                .data.data,
        enabled: !!advertisement_id,
    });

export const useGetAdvertiserVehiclesStats = () =>
    useQuery<IAdvertisementVehicle[], string>({
        queryKey: ["advertisement-vehicles-stats"],
        queryFn: async () =>
            (await axios.get("/api/get-advertiser-dashboard-stats")).data.data,
    });


export const useGetShowAdvertisementStats = (
    { status, page } : {status?: AdStatusesType, page: number}
) => useQuery<IAdvertisementStat[], string>({
    queryKey: ["show-advertisement-stats", status, page],
    queryFn: async () => (await axios.get("/api/show-advertisement-stats", { params: { status, page } })).data.data
});

export const useGetVehicleAdvertisementStatsDetails = (
    { to, from, advertisement_id, page } : {to: string,from: string, advertisement_id:string, page: number}
) => useQuery<VehicleAdvertisementStatsResponse, string>({
    queryKey: ["show-advertisement-stats-details", advertisement_id, page,to, from],
    queryFn: async () => (await axios.get("/api/vehicles-advertisement-stats", { params: { to, from, advertisement_id, page } })).data
});

export const useGetAdvertisementOperationArea = ({
                                                     advertisement_id,
                                                 }: GetAdvertisementOperationAreaPropsType) =>
    useQuery<IAdvertisementOperatingArea[], string>({
        queryKey: ["advertisement-operation-area", advertisement_id],
        queryFn: async () =>
            (
                await axios.get(
                    `/api/get-advertisement-operating-area/${advertisement_id}`
                )
            ).data.data,
        enabled: !!advertisement_id,
    });
export const useDeleteAdvertisement = () =>
  useMutation<void, string, { id: string }>({
    mutationFn: async ({ id }) =>
      await axios.delete(`/api/delete-advertisement/${id}`),
  });

export const useUpdateAdStatus = () =>
  useMutation<void, string, UpdateAdvertisementStatusType>({
    mutationFn: (props) =>
      axios.post("/api/update-advertisement-status", props),
  });


export const useGetAdvertisementCargoList = (props: GetAdvertisementCargoPropsType) =>
useQuery<IAdvertissementCargoResponse, string>({
    queryKey: ["advertisement-cargo-list", {...Object.values(props)}],
    queryFn: async () => (await axios.get("/api/get-advehicles-list", { params: props })).data,
    enabled: !!props.advertisement_id,
});


export const useGetCargoImage = (props: GetCargoImageListProps) => useQuery<ICargoImage[], string>({
    queryKey: ["advertisement-cargo-image", {...Object.values(props)}],
    queryFn: async () => (await axios.get("/api/get-cargo-images", { params: props })).data.data,
    enabled: !!props.cargo_vehicle_id && !!props.advertisement_id,
});


export const useGetStatBasedAdvertisment = (props : GetTotalAdvertisementStatProps) => useQuery<ITotalAdvertisementStat, string>({
    queryKey: ["stats-based-advertisement",{...Object.values(props)}],
    queryFn: async () => (await axios.get("/api/stats-based-advertisement",{ params: props })).data.data,
});

export const useGetDraftAdvertisementImages = (id:string) => useQuery<DraftAdvertisementImage[], string>({
    queryKey: ["draft-advertisement-images"],
    queryFn: async () => (await axios.get(`/api/get-advertisement-images/${id}/draft`)).data.data,
});
