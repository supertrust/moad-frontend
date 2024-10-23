import useAuth from "@src/hooks/useAuth";
import koKR from "antd/locale/ko_KR";
import enUS from "antd/locale/en_US";
import React, { useCallback } from 'react';

const useOptions = () => {

    const { dictionary : { adList : {allAdStatuses}}, isKorean } = useAuth();

     const AllStatuses = [
        { label: allAdStatuses?.inProgress, value: 'in_progress' },
        { label: allAdStatuses?.adReviewing, value: 'ad_reviewing' },
        { label: allAdStatuses?.end, value: 'end' },
        { label: allAdStatuses?.declined, value: 'decline' },
        { label: allAdStatuses?.applying, value: 'applying' },
        { label: allAdStatuses?.recruitingCargoOwners, value: 'recruiting_cargo_owners' },
        { label: allAdStatuses?.applyingForAdvertisement, value: 'applying_for_advertisement' },
        { label: allAdStatuses?.proceeding, value: 'proceeding' },
    ]

    const getAntDesignLocale = useCallback(()=>isKorean ? koKR : enUS, [isKorean]);

    return {
        AllStatuses,
        getAntDesignLocale
    }
};

export default useOptions;