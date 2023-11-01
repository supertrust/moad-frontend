import { queryClient } from "@src/services/ReactQueryClient";
import { ChangePasswordPropsType, GetAdvertiserPropsType, GetUserPropsType, GetUserRolePropsType, IAdvertiser, IUser, IUserRole, UpdateAdvertiserInfoType, UpdateUserInfoType } from "@src/types/user";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUser = ({ isAuthenticated }: GetUserPropsType) => useQuery<IUser>({
    queryKey: ["user"],
    queryFn: async () => (await axios.get("/api/get-user-details")).data.data,
    enabled: isAuthenticated
})

export const useGetUserRole = ({ isAuthenticated }: GetUserRolePropsType) => useQuery<IUserRole>({
    queryKey: ["user-role"],
    queryFn: async () => (await axios.get("/api/get-role")).data.data,
    enabled: isAuthenticated
})

export const useChangePassword = () => useMutation<void, string, ChangePasswordPropsType>({
    mutationFn: (props) => axios.post("/api/change-password", props)
})

export const useUpdateUserInfo = () => useMutation<void, string, UpdateUserInfoType>({
    mutationFn: (props) => axios.post("/api/update-myinfo", props),
    onSuccess: () =>  queryClient.invalidateQueries(["user"])
})

export const useUpdateUserProfileImage = () => useMutation<void, string, { profile_img: File}>({
    mutationFn: async ({ profile_img }) => {
        const formData = new FormData();
        formData.append('profile_img', profile_img);
        return (await axios.post("/api/update-profile-image", formData, {
            headers: { "Content-Type": "multipart/form-data"}
        }))
    },
    onSuccess: () =>  queryClient.invalidateQueries(["user"])
})


export const useMemberWithdrawal = () =>  useMutation<void, string, { reason : string }>({
    mutationFn: (data) => axios.post("/api/membership-withdrawal", data ),
})

export const useUpdateAdvertiserInfo = () =>
  useMutation<void, string, UpdateAdvertiserInfoType>({
    mutationFn: (props) =>
      {
        const {id,...data} = props;
        return(axios.post(`/api/update-advertiser-user/${id}`, data))
      }
});

export const useGetAdvertiserInfo = ({ id }: GetAdvertiserPropsType) => {
    return(useQuery<IAdvertiser>({
    queryKey: ["advertiser",id],
    queryFn: async () => (await axios.get(`/api/admin-advertisment-management/${id}`)).data?.data[0],
}))}