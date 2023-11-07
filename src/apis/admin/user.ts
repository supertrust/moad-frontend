import { IAdminUserDetails, UpdateAdvetiserUserProps } from "@src/types/admin/user";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUpdateAdminAdvertiserUser = () =>  useMutation<void, string, UpdateAdvetiserUserProps>({
    mutationFn: async ({advertiser_id, ...props}) =>  (await axios.post(`/api/update-admin-advertiser-user/${advertiser_id}`, props)).data.data,
});

export const useGetAdminDetails = (id: number) => useQuery<IAdminUserDetails, void>({
    queryKey: ['admin-details', id],
    queryFn: async () =>  (await axios.get(`/api/get-admin-details/${id}`)).data.data,
})