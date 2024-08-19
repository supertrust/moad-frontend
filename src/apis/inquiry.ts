import { API_URL } from "@src/apis/urls";
import { DeleteInquiryPropsType, GetInquiriesPropsType, GetInquiryDetailPropsType, IGetInquiriesResponse, IInquiry, IInquiryDetail, SaveInquiryType, UpdateInquiryType } from "@src/types/inquiry";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetInquiries = ({ page }: GetInquiriesPropsType) => useQuery<IGetInquiriesResponse, string>({
    queryKey: ["inquiries", page],
    queryFn: async () => (await axios.get(API_URL.getInquiryList(), { params: { page } })).data.data
})

export const useGetInquiryDetail = ({ id }: GetInquiryDetailPropsType) => useQuery<IInquiryDetail, string>({
    queryKey: ["inquiry", id],
    queryFn: async () => (await axios.get(API_URL.getInquiryDetails(id))).data.data,
    enabled : !!id
})

export const useSaveInquiry = () => useMutation<void, string, SaveInquiryType>({
    mutationFn: async (props) => {return(axios.post(API_URL.saveInquiry(), props,{
        headers: { "content-type": "multipart/form-data" },
      }))},
})

export const useUpdateInquiry = () => useMutation<void, string, UpdateInquiryType>({
    mutationFn: async (props) => axios.post(API_URL.updateInquiry(), props)
})


export const useDeleteInquiry = () => useMutation<void, string, DeleteInquiryPropsType>({
    mutationFn: async ({ id }) => axios.post(API_URL.deleteInquiry(),{ id})
})