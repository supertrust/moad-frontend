import { GetNoticeDetailPropsType, GetNoticesPropsType, INotice, INoticeDetail } from "@src/types/notice";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetNotices = ({ page }: GetNoticesPropsType) => useQuery<{ data: INotice[], total: number }, string>({
  queryKey: ["notices", page],
  queryFn: async () => {
    try {
      const { data } = await axios.get("/api/get-notices", { params: { page } })
      return { data: data.data, total: data.total }
    } catch (error) {
      throw error
    }
  },
})

export const useGetNoticeDetail = ({ id }: GetNoticeDetailPropsType) => useQuery<INoticeDetail, string>({
  queryKey: ["notice", id],
  queryFn: async () => (await axios.get(`/api/notice/${id}`)).data.data,
})