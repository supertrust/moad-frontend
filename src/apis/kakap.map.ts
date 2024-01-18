import { KAKAO_REST_API_KEY } from "@src/config";
import { GetDirectionType, IGetDirection, IPlaceSearchResult, ISearchResult, MultipleStopDirectionProps } from "@src/types/kakao.map";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetDirection = (props : GetDirectionType) => useQuery<IGetDirection>({
    queryKey: ['kakao-direction', {...Object.values(props)} ],
    queryFn: async () => (await axios.get(
        "https://apis-navi.kakaomobility.com/v1/directions", { 
            params: props ,
            headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` }
        }
    )).data,
    // enabled: !!props.origin && !!props.destination
})

export const useCheckMultipeStopDirection = () => useMutation<IGetDirection, string, MultipleStopDirectionProps>({
    mutationFn: async (props) => (await axios.post('https://apis-navi.kakaomobility.com/v1/waypoints/directions', props, {
        headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`}
    })).data
})


export const useSearchAddress = (query: string) => useQuery<ISearchResult>({
    queryKey: ['kakao-search-address', query ],
    queryFn: async () => (await axios.get( "https://dapi.kakao.com/v2/local/search/address.json", { 
        params: { query , page: 5 } ,
        headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`}
    })).data,
    enabled: !!query
})


export const usePlaceSearchByKeyword = (query: string) => useQuery<IPlaceSearchResult>({
    queryKey: ['kakao-search-address', query ],
    queryFn: async () => (await axios.get( "https://dapi.kakao.com/v2/local/search/keyword.json", { 
        params: { query , page: 10, sort: 'accuracy' } ,
        headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`}
    })).data,
    enabled: !!query
})