import { useCallback } from 'react';
import { apiGetStatistics } from 'services/ApiStatistic';
import { FailedResponse, SuccessResponse } from 'utils/response';

const handleResp = ({ data }) => {
    const categories = data.map((item) => {
        return item.date || '';
    });

    const incomes = data.map((item) => {
        return item.income || 0;
    });

    const expenses = data.map((item) => {
        return item.expense || 0;
    });

    const series = [
        {
            name: 'incomes',
            data: incomes,
        },
        {
            name: 'expenses',
            data: expenses,
        },
    ];

    return { categories, series };
}

function useStatistic() {
    const getStatistic = useCallback(async (q = '') => {
        try {
            const resp = await apiGetStatistics(q);
            return SuccessResponse(handleResp(resp));
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    return {
        getStatistic,
    };
}

export default useStatistic;