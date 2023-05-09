import { DeleteInquiryPropsType, GetInquiriesPropsType, GetInquiryDetailPropsType, IInquiry, IInquiryDetail } from "@src/types/inquiry";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetInquiries = ({ page }: GetInquiriesPropsType) => useQuery<{ data: IInquiry[], last_page: number }, string>({
    queryKey: ["inquiries", page],
    queryFn: async () => {
        try {
            const { data } = await axios.get("/api/get-inquiry", { params: { page: page.toString() } })
            return { data: data.data, last_page: data.last_page }
        } catch (error) {
            throw error
        }
    },
})

export const useGetInquiryDetail = ({ id }: GetInquiryDetailPropsType) => useQuery<IInquiryDetail, string>({
    queryKey: ["inquiry", id],
    queryFn: async () => (await axios.get(`/api/inquiry/${id}`)).data.data,
})

export const useSaveInquiry = () => useMutation<void, string, FormData>({
    mutationFn: async (props) => axios.post("/api/save-inquiry", props),
})

export const useUpdateInquiry = () => useMutation<void, string, FormData>({
    mutationFn: async (props) => axios.post("/api/update-inquiry", props)
})


export const useDeleteInquiry = () => useMutation<void, string, DeleteInquiryPropsType>({
    mutationFn: async ({ id }) => axios.post(`/api/delete-inquiry/${id}`)
})