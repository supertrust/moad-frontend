import { API_URL } from "@src/apis/urls";
import { CategoryType, IFaq, IFaqRes, IGetCategoriesResp } from "@src/types/faq";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = ({ type }: { type?: CategoryType }) =>
    useQuery<IGetCategoriesResp>({
        queryKey: ['categories', type],
        queryFn: async () => (await axios.get(API_URL.getPostCategories(type))).data,
        enabled: !!type
})
export const useGetFaq = (currentPage:number, filter?: string) => useQuery<IFaqRes, string>({
    queryKey: ["faq" , currentPage,filter ],
    queryFn: async () => (await axios.get(API_URL.getFaqList(currentPage,filter))).data,
})
