import { ISubmittedAdvertisementResponse } from "@src/types/cargo/submitted-advertisement";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";


export const useGetCargoAdvertisementList = () => useQuery<ISubmittedAdvertisementResponse[], string>({
    queryKey: ["cargo-advertisement-list"],
    queryFn: async () => (await axios.get("/api/get-advertisement-available-list")).data.data,
});

