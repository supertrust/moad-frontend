import { IFaq } from "@src/types/faq";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetFaq = () => useQuery<IFaq[], string>({
    queryKey: ["faq"],
    queryFn: async () => (await axios.get("/api/get-faq/{filter}")).data.data,
})

export const useGetFaqUse = () => useQuery<IFaq[], string>({
    queryKey: ["faq-use"],
    queryFn: async () => (await axios.get("/api/get-faq/service_use")).data.data,
})
export const useGetFaqRefund = () => useQuery<IFaq[], string>({
    queryKey: ["faq-refund"],
    queryFn: async () => (await axios.get("/api/get-faq/payment_refund")).data.data,
})
export const useGetFaqEtc = () => useQuery<IFaq[], string>({
    queryKey: ["faq-etc"],
    queryFn: async () => (await axios.get("/api/get-faq/etc")).data.data,
})