import useAuth from "@src/hooks/useAuth";
import React, { useCallback } from 'react';

const useUtils = () => {

    const { isKorean } = useAuth()

    const formatTimeFromMinute = useCallback((n: number) => {
        const seconds = Math.round(n);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            const remainingMinutes = minutes % 60;
            return isKorean
                ? `${hours}시간 ${remainingMinutes > 0 ? remainingMinutes + '분' : ''}`
                : `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes > 0 ? remainingMinutes + ' minute' + (remainingMinutes > 1 ? 's' : '') : ''}`;
        }

        if (minutes > 0) {
            return isKorean
                ? `${minutes}분`
                : `${minutes} minute${minutes > 1 ? 's' : ''}`;
        }

        return isKorean
            ? `${seconds}초`
            : `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }, [isKorean]);

    return {
     formatTimeFromMinute
    }
};

export default useUtils;