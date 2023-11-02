import { useQuery } from "@tanstack/react-query";
import { GetPostType, IGetPostResponse, IPost } from "@src/types/admin/posts";
import axios from "@src/utils/axios";


export const useGetPosts = (props: GetPostType) =>  useQuery<IGetPostResponse<IPost>, string>({
    queryKey:['posts-list', {...Object.values(props)}],
    queryFn: async () =>   {
        const { page , ...data } = props;
        return (await axios.post(`/api/managing-posts?page=${page}` , data )).data.data
    }
});
