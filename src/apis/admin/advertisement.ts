import { GetCompanyAdListType, ICompanyAdList } from "@src/types/admin/advertisment";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useCompanyAdList = (props: GetCompanyAdListType) =>  useQuery<ICompanyAdList[], string>({
    queryKey:['company-ad-list'],
    queryFn: async () => (await axios.get('/api/get-ad-company-list' , { params: props } )).data.data
})