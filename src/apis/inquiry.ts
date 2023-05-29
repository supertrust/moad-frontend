import { DeleteInquiryPropsType, GetInquiriesPropsType, GetInquiryDetailPropsType, IGetInquiriesResponse, IInquiry, IInquiryDetail, SaveInquiryType, UpdateInquiryType } from "@src/types/inquiry";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetInquiries = ({ page }: GetInquiriesPropsType) => useQuery<IGetInquiriesResponse, string>({
    queryKey: ["inquiries", page],
    queryFn: async () => (await axios.get("/api/get-inquiry", { params: { page } })).data.data
})

export const useGetInquiryDetail = ({ id }: GetInquiryDetailPropsType) => useQuery<IInquiryDetail, string>({
    queryKey: ["inquiry", id],
    queryFn: async () => (await axios.get(`/api/inquiry/${id}`)).data.data,
})

export const useSaveInquiry = () => useMutation<void, string, SaveInquiryType>({
    mutationFn: async (props) => axios.post("/api/save-inquiry", props),
})

export const useUpdateInquiry = () => useMutation<void, string, UpdateInquiryType>({
    mutationFn: async (props) => axios.post("/api/update-inquiry", props)
})


export const useDeleteInquiry = () => useMutation<void, string, DeleteInquiryPropsType>({
    mutationFn: async ({ id }) => axios.get(`/api/delete-inquiry/${id}`)
})