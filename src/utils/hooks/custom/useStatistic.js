import { useCallback } from 'react';
import { apiGetStatistics, apiGetStatisticsByTimeFrame, apiGetAverageByCategory } from 'services/StatisticService';
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

    const getStatisticsByTimeFrame = useCallback(async (timeFrame = 'month') => {
        try {
            const resp = await apiGetStatisticsByTimeFrame(timeFrame);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    const getStatisticOfCategory = useCallback(async (q = '') => {
        try {
            const resp = await apiGetAverageByCategory(q);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    return {
        getStatistic,
        getStatisticsByTimeFrame,
        getStatisticOfCategory,
    };
}

export default useStatistic;