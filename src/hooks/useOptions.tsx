import useAuth from "@src/hooks/useAuth";
import React from 'react';

const useOptions = () => {

    const { dictionary : { adList : {allAdStatuses}} } = useAuth();

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

    return {
        AllStatuses
    }
};

export default useOptions;