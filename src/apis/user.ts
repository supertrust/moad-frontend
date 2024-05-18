import { API_URL } from "@src/apis/urls";
import { queryClient } from "@src/services/ReactQueryClient";
import { ChangePasswordPropsType, GetUserPropsType, IUser, UpdateUserInfoType } from "@src/types/user";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUser = ({ isAuthenticated }: GetUserPropsType) => useQuery<IUser>({
    queryKey: ["user"],
    queryFn: async () => (await axios.get(API_URL.getUserDetails())).data.data,
    enabled: isAuthenticated,
    retry : 0
})

export const useChangePassword = () => useMutation<void, string, ChangePasswordPropsType>({
    mutationFn: (props) => axios.post(API_URL.postChangePassword(), props)
})

export const useUpdateUserInfo = () => useMutation<void, string, UpdateUserInfoType>({
    mutationFn: (props) => axios.post(API_URL.updateUserInfo(), props),
    onSuccess: () =>  queryClient.invalidateQueries(["user"])
})

export const useUpdateUserProfileImage = () => useMutation<void, string, { profile_img: File}>({
    mutationFn: async ({ profile_img }) => {
        const formData = new FormData();
        formData.append('profile_img', profile_img);
        return (await axios.post(API_URL.updateProfileImage(), formData, {
            headers: { "Content-Type": "multipart/form-data"}
        }))
    },
    onSuccess: () =>  queryClient.invalidateQueries(["user"])
})


export const useMemberWithdrawal =  () =>  useMutation<void, string, { reason : string }>({
    mutationFn: async (props) => {
        return((await axios.post(API_URL.postMemberWithdrawal(), props)).data)}
})