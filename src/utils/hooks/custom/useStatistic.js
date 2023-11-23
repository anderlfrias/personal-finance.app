import { useCallback } from 'react';
import { apiGetStatistics, apiGetStatisticsByTimeFrame, apiGetAverageByCategory } from 'services/StatisticService';
import useResponse from './useResponse';

function useStatistic() {
    const { FailedResponse, SuccessResponse } = useResponse()
    const getStatistic = useCallback(async (q = '') => {
        try {
            const resp = await apiGetStatistics(q);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const getStatisticsByTimeFrame = useCallback(async (timeFrame = 'month') => {
        try {
            const resp = await apiGetStatisticsByTimeFrame(timeFrame);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const getStatisticOfCategory = useCallback(async (q = '') => {
        try {
            const resp = await apiGetAverageByCategory(q);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    return {
        getStatistic,
        getStatisticsByTimeFrame,
        getStatisticOfCategory,
    };
}

export default useStatistic;