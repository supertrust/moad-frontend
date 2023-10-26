import { IAdminAuth } from "@src/types/admin/auth";
import { LoginPropsType } from "@src/types/auth";
import axios from "@src/utils/axios";
import { useMutation } from "@tanstack/react-query";

export const useAdminAdvertiserLogin = () => useMutation<IAdminAuth, string, LoginPropsType>({
    mutationFn: async (props:LoginPropsType) => (await axios.post("/api/admin-advertiser-login", props)).data.data,
});

