import { API_URL } from "@src/apis/urls";
import { queryClient } from "@src/services/ReactQueryClient";
import {
    AdStatusesType,
    DraftAdvertisementImage,
    GetAdvertisementCargoPropsType,
    GetAdvertisementDetailPropType,
    GetAdvertisementOperationAreaPropsType,
    GetAdvertisementsPropType,
    GetAdvertisementVehiclesPropsType,
    GetCargoImageListProps, GetCargoVehicleImageListProps,
    GetCargoVerificationImagesProps,
    GetTotalAdvertisementStatProps,
    IAdvertisement,
    IAdvertisementData,
    IAdvertisementOperatingArea,
    IAdvertisementStatResponse,
    IAdvertisementVehicle,
    IAdvertissementCargoResponse,
    ICargoImage, ICargoVehicleImage, ICargoVerificationImageRes,
    IOperatingArea,
    ITotalAdvertisementStat,
    IVehicle,
    SaveAdvertisementType,
    UpdateAdvertisementStatusType,
    VehicleAdvertisementStatsResponse
} from "@src/types/advertisement";
import { GetVehicleDetailsPropsType, GetVehicleDetailsResponseType } from "@src/types/vehicle";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAdvertisements = (props: GetAdvertisementsPropType = {}) =>
    useQuery<IAdvertisementData, string>({
        queryKey: ["advertisements", ...Object.values(props).filter(value => value != undefined && value != null)],
        queryFn: async () =>
            (await axios.get(API_URL.getAdvertisements(), { params: props })).data,
        retry: 0, // Disable retries
    });

export const useGetAdvertisementDetail = (
    props: GetAdvertisementDetailPropType
) =>
    useQuery<IAdvertisement, string>({
        queryKey: ["advertisement-detail", props.id],
        queryFn: async () =>
            (await axios.get( API_URL.getAdvertisements(), { params: { id: props.id } }))
                .data.data?.[0],
        enabled : !!props.id
    });
export const useGetAdvertisementAllDetail = ({
                                                 advertisement_id,
                                             }: GetAdvertisementOperationAreaPropsType) => {
    return useQuery<IAdvertisementOperatingArea[], string>({
        queryKey: ["advertisement-all-detail", advertisement_id],
        queryFn: async () =>
            (
                await axios.get(
                    API_URL.getAdvertisementDetails(advertisement_id)
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
                    API_URL.getVehicleDetails(advertisement_id, cargo_vehicle_id)
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
            (await axios.get(API_URL.getAdvertisementImages(advertisement_id))).data
                .data,
        enabled : !!advertisement_id
    });

export const useGetVehicles = () =>
    useQuery<IVehicle[], string>({
        queryKey: ["vehicles"],
        queryFn: async () => (await axios.get(API_URL.getVehicleList())).data.data,
    });

export const useGetOperatingAreas = () =>
    useQuery<IOperatingArea[], string>({
        queryKey: ["operating-areas"],
        queryFn: async () => (await axios.get(API_URL.getOperatingAreas())).data.data,
    });

export const useSaveAdvertisement = () =>   useMutation<IAdvertisement, string, SaveAdvertisementType>({
    mutationFn: async (props) =>{
        const formData = new FormData();
        Object.entries(props).forEach(([key, value]) =>
            !!value && formData.append(key, value as string | Blob)
        );
        return(await axios.post(API_URL.saveAdvertisement(), formData, {
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
            (await axios.get(API_URL.getAdvertisementVehicles(), { params: { advertisement_id } }))
                .data.data,
        enabled: !!advertisement_id,
    });

export const useGetAdvertiserVehiclesStats = (props:{notfication?: boolean }={}) =>
    useQuery<IAdvertisementVehicle[], string>({
        queryKey: ["advertisement-vehicles-stats",...Object.values(props)],
        queryFn: async () =>
            (await axios.get(API_URL.getAdvertiserVehicleStats(),{
                params: {
                    ...props
                }
            })).data.data,
        retry :0
    });


export const useGetShowAdvertisementStats = (
    { status, page,ad_type,start_date,end_date,limit=10 } : {status?: AdStatusesType, page: number, ad_type?: string,  start_date: Date | string
        end_date: Date | string,limit?: number}
) => useQuery<IAdvertisementStatResponse, string>({
    queryKey: ["show-advertisement-stats", status, page,start_date,end_date,  ad_type,limit],
    queryFn: async () => (await axios.get(API_URL.getAdvertisementStats(), { params: { status, page,  ...(ad_type && { ad_type }),start_date,end_date,limit } })).data
});

export const useGetVehicleAdvertisementStatsDetails = (
    { to, from, advertisement_id, page } : {to: string,from: string, advertisement_id:string, page: number}
) => useQuery<VehicleAdvertisementStatsResponse, string>({
    queryKey: ["show-advertisement-stats-details", advertisement_id, page,to, from],
    queryFn: async () => (await axios.get(API_URL.getVehiclesAdvertisementStats(), { params: { to, from, advertisement_id, page } })).data,
    enabled : !!advertisement_id
});

export const useGetAdvertisementOperationArea = ({
                                                     advertisement_id,
                                                 }: GetAdvertisementOperationAreaPropsType) =>
    useQuery<IAdvertisementOperatingArea[], string>({
        queryKey: ["advertisement-operation-area", advertisement_id],
        queryFn: async () =>
            (
                await axios.get(
                    API_URL.getAdvertisementOperationArea(advertisement_id)
                )
            ).data.data,
        enabled: !!advertisement_id,
    });
export const useDeleteAdvertisement = () =>
  useMutation<void, string, { id: string }>({
    mutationFn: async ({ id }) =>
      await axios.delete(API_URL.deleteAdvertisement(id)),
  });

export const useUpdateAdStatus = () =>
  useMutation<void, string, UpdateAdvertisementStatusType>({
    mutationFn: (props) =>
      axios.post(API_URL.updateAdvertisementStatus(), props),
  });


export const useGetAdvertisementCargoList = (props: GetAdvertisementCargoPropsType) =>
useQuery<IAdvertissementCargoResponse, string>({
    queryKey: ["advertisement-cargo-list", {...Object.values(props)}],
    queryFn: async () => (await axios.get(API_URL.getAdvertisementCargoList(), { params: props })).data,
    enabled: !!props.advertisement_id,
});


export const useGetCargoImage = (props: GetCargoImageListProps) => useQuery<ICargoImage[], string>({
    queryKey: ["advertisement-cargo-image", {...Object.values(props)}],
    queryFn: async () => (await axios.get(API_URL.getCargoImages(), { params: props })).data.data,
    enabled: !!props.cargo_vehicle_id && !!props.advertisement_id,
});

export const useGetCargoVehicleImages = (props: GetCargoVehicleImageListProps) => useQuery<ICargoVehicleImage[], string>({
    queryKey: ["cargo-vehicle-images", {...Object.values(props)}],
    queryFn: async () => (await axios.get(API_URL.getCargoVehicleImages(), { params: props })).data.data,
    enabled: !!props.cargo_vehicle_id
});


export const useGetStatBasedAdvertisment = (props : GetTotalAdvertisementStatProps) => useQuery<ITotalAdvertisementStat, string>({
    queryKey: ["stats-based-advertisement",{...Object.values(props)}],
    queryFn: async () => (await axios.get(API_URL.getStatBasedAdvertisement(),{ params: props })).data.data,
});

export const useGetDraftAdvertisementImages = (id:string) => useQuery<DraftAdvertisementImage[], string>({
    queryKey: ["draft-advertisement-images",id],
    queryFn: async () => (await axios.get(API_URL.getDraftAdvertisementImages(id))).data.data,
    enabled : !!id
});

export const useGetCargoVerificationImages = (props:GetCargoVerificationImagesProps) => useQuery<ICargoVerificationImageRes, string>({
    queryKey: ["get-cargo-verification-images", props ],
    queryFn: async () => (await axios.get(API_URL.getCargoVerificationImages(), { params: props })).data.data,
    retry: 0,
});
