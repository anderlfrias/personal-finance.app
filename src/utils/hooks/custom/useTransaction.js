import { useCallback } from 'react'
import {
    apiGetTransactions,
} from 'services/TransactionService'
import { FailedResponse, SuccessResponse } from 'utils/response';

function useTransaction() {
    const getLastDayOfMonth = useCallback((year, month) => {
        const date = new Date(year, month + 1, 0);
        return date.getDate();
    }, []);

    const getStartDate = useCallback(() => {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }, []);

    const getEndDate = useCallback(() => {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), getLastDayOfMonth(date.getFullYear(), date.getMonth()));
    }, [getLastDayOfMonth]);

    const getTransactions = useCallback(async (filter = '', startDate = getStartDate(), endDate = getEndDate()) => {
        try {
            const query = `${filter}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
            const resp = await apiGetTransactions(query);
            console.log(resp);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [getEndDate, getStartDate]);

    return {
        getTransactions,
    }
}

export default useTransaction