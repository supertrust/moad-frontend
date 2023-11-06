import { IPostAdminStatisticsListRes,IGetAdminStatisticsRes } from "@src/types/admin/manage-statistics";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminStatistics = () =>  useQuery<IGetAdminStatisticsRes, string>({
    queryKey:['admin-statistics'],
    queryFn: async () => (await axios.get(`/api/advertisers-statistics`)).data
});

export const usePostAdminStatisticsList = () =>  useQuery<IPostAdminStatisticsListRes, string>({
    queryKey:['admin-statistics-list'],
    queryFn: async () => (await axios.post(`/api/get-advertisement-statistics`)).data
});
