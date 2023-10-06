import { ILoginRsq, ILoginRes } from "@src/types/cargo/cargo-auth";
import axios from "@src/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";


export const useCargoLogin = ( options?: UseMutationOptions<
    ILoginRes,
    string,
    ILoginRsq
    >,) => useMutation<ILoginRes, string, ILoginRsq>({
    mutationFn: async (props:ILoginRsq) => (
        await axios.post("/api/cargo-login", props)).data.data,
        ...options
});

