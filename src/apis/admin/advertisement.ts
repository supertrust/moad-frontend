import { GetCompanyAdListType, ICompanyAdList } from "@src/types/admin/advertisment";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useCompanyAdList = (props: GetCompanyAdListType) =>  useQuery<ICompanyAdList[], string>({
    queryKey:['company-ad-list', {...Object.values(props)}],
    queryFn: async () => {
        const { page , ...data } = props;
        return (await axios.post(`/api/get-ad-company-list?page=${page}` , {
            ...data,
            adStatus: data.adStatus?.toString(),
            adType: data.adType?.toString(),
        } )).data.data
    }
});