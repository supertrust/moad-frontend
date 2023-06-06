import { IFaq } from "@src/types/faq";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetFaq = () => useQuery<IFaq[], string>({
    queryKey: ["faq"],
    queryFn: async () => (await axios.get("/api/get-faq/service_use")).data.data,
})

export const useGetFaqUse = () => useQuery<IFaq[], string>({
    queryKey: ["faq-use"],
    queryFn: async () => (await axios.get("/api/get-faq/service_use")).data.data,
})