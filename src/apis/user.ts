import { ChangePasswordPropsType, GetUserPropsType, GetUserRolePropsType, IUser, IUserRole, UpdateUserInfoType } from "@src/types/user";
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
    mutationFn: (props) => axios.post("/api/update-myinfo", props)
})