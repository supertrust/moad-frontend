import { queryClient } from "@src/services/ReactQueryClient";
import { GetCompanyAdListType, IAdvertisementDetails, ICompanyAdList, UpdateCompanyAdProps } from "@src/types/admin/advertisment";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCompanyAdList = (props: GetCompanyAdListType) =>  useQuery<ICompanyAdList[], string>({
    queryKey:['company-ad-list', {...Object.values(props)}],
    queryFn: async () => {
        const { page , ...data } = props;
        return (await axios.post(`/api/get-ad-company-list?page=${page}` , {
            ...data,
            adStatus: data.adStatus?.toString(),
            adType: data.adType?.toString(),
        } )).data.data
    }
});


export const useGetAdvertisementDetails = (advertisement_id: number) =>  useQuery<IAdvertisementDetails, string>({
    queryKey:['ad-details', advertisement_id],
    queryFn: async () => (await axios.get(`/api/get-ad-company-detail`, { params : {advertisement_id}})).data.data
});


export const useUpdateCompanyAd = () =>  useMutation<void, string, UpdateCompanyAdProps>({
    mutationFn: async ({ advertising_area, vehicle_details , ...data}) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) =>
            !!value && formData.append(key, value as string | Blob)
        );
        formData.append('advertising_area', JSON.stringify(advertising_area));
        formData.append('vehicle_details', JSON.stringify(vehicle_details));
        return (await axios.post("/api/update-ad-company", formData,
            { headers: { 'content-type': 'multipart/form-data' } }
        ))
    },
    onSuccess: (_, { advertisement_id }) =>  {
        queryClient.invalidateQueries(['ad-details', advertisement_id])
        queryClient.invalidateQueries(['company-ad-list'])
    }
});