import { GetNoticeDetailPropsType, GetNoticesPropsType, INotice, INoticeDetail } from "@src/types/notice";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetNotices = ({ page }: GetNoticesPropsType) => useQuery<INotice[], string>({
  queryKey: ["notices", page],
  queryFn: async () => (await axios.get("/api/get-notices", { params: { page } })).data.data
})

export const useGetNoticeDetail = ({ id }: GetNoticeDetailPropsType) => useQuery<INoticeDetail, string>({
  queryKey: ["notice", id],
  queryFn: async () => (await axios.get(`/api/notice/${id}`)).data.data,
})