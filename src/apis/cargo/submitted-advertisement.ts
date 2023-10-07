import { ICargoAdvertisement } from "@src/types/cargo";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";


export const useGetCargoAdvertisementList = () => useQuery<ICargoAdvertisement[], string>({
    queryKey: ["cargo-advertisement-list"],
    queryFn: async () => (await axios.get("/api/get-advertisement-available-list")).data.data,
});

