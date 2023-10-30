import { AdminMemberInquiryListRes } from "@src/types/admin/member-inquiry";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";


export const useAdminMemberInquiryList = () => useQuery<AdminMemberInquiryListRes, string>({
    queryKey: ["admin-member-inquiry-list"],
    queryFn: async () => (await axios.get("/api/admin-advertisment-management")).data,
});