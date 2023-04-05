import { useCallback } from 'react';
import { apiGetStatistics } from 'services/ApiStatistic';
import { FailedResponse, SuccessResponse } from 'utils/response';

function useStatistic() {
    const getStatistic = useCallback(async (q = '') => {
        try {
            const resp = await apiGetStatistics(q);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    return {
        getStatistic,
    };
}

export default useStatistic;