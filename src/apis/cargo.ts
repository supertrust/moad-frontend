import { CargoAdvertismentListProps, ICargoAdvertisement } from "@src/types/cargo";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetCargAdvertisementList = (props : CargoAdvertismentListProps) => useQuery<ICargoAdvertisement[], string>({
    queryKey: ["cargo-advertisement-list"],
    queryFn: async () => (await axios.get("/api/get-advertisement-available-list", { params: props })).data.data,
});