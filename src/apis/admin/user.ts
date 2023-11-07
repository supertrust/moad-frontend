import { UpdateAdvetiserUserProps } from "@src/types/admin/user";
import axios from "@src/utils/axios";
import { useMutation } from "@tanstack/react-query";

export const useUpdateAdminAdvertiserUser = () =>  useMutation<void, string, UpdateAdvetiserUserProps>({
    mutationFn: async ({advertiser_id, ...props}) =>  (await axios.post(`/api/update-admin-advertiser-user/${advertiser_id}`, props)).data.data,
});