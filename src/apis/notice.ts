import { API_URL } from "@src/apis/urls";
import {
  GetNoticeDetailPropsType,
  GetNoticesPropsType,
  INotice,
  INoticeDetail, INoticeResponse,
  INotificationResponse
} from "@src/types/notice";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetNotices = ({ page }: GetNoticesPropsType) => useQuery<INoticeResponse, string>({
  queryKey: ["notices", page],
  queryFn: async () => (await axios.get(API_URL.getNotices(), { params: { page } })).data.data
})

export const useGetNoticeDetail = ({ id }: GetNoticeDetailPropsType) => useQuery<INoticeDetail, string>({
  queryKey: ["notice", id],
  queryFn: async () => (await axios.get(API_URL.getNoticeDetails(id))).data.data,
})

export const useGetAllNotification = (props = {}) => useQuery<INotificationResponse, string>({
  queryKey: ["notices-all",],
  queryFn: async () => (await axios.get(API_URL.getAllNotifications(),{ params: props })).data.data
})

