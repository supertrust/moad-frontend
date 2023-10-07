import { queryClient } from "@src/services/ReactQueryClient";
import { AssignAdvertismentToCargoProps, CargoAdvertismentListProps, ICargoAdvertisement } from "@src/types/cargo";
import { ISubmittedAdvertisementResponse } from "@src/types/cargo/submitted-advertisement";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCargAdvertisementList = (props : CargoAdvertismentListProps) => useQuery<ICargoAdvertisement[], string>({
    queryKey: ["cargo-advertisement-list"],
    queryFn: async () => (await axios.get("/api/get-advertisement-available-list", { params: props })).data.data,
});


export const useGetCargoSubmittedAdvertisementList = () => useQuery<ISubmittedAdvertisementResponse[], string>({
    queryKey: ["cargo-submitted-advertisement-list"],
    queryFn: async () => (await axios.get("/api/get-submitted-advertisement")).data.data,
});


export const useAssignAdvertismentToCargo = () => useMutation<void, string, AssignAdvertismentToCargoProps>({
    mutationFn: async (props) => (await axios.post("/api/assign-advertisement-to-cargo", props)).data.data,
    onSuccess: () => {
        queryClient.invalidateQueries(["cargo-advertisement-list"]);
        queryClient.invalidateQueries(["cargo-submitted-advertisement-list"]);
    }
})