import { useCallback } from 'react'
import {
    apiGetTransactions,
    apiGetTransactionById,
    apiCreateTransaction,
    apiUpdateTransaction,
    apiDeleteTransaction,
} from 'services/TransactionService'
import { FailedResponse, SuccessResponse } from 'utils/response';

const getLastDayOfMonth = (year, month) => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
};

const getStartDate = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

const getEndDate = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), getLastDayOfMonth(date.getFullYear(), date.getMonth()));
};

function useTransaction() {

    const getTransactions = useCallback(async (filter = '', startDate = getStartDate(), endDate = getEndDate()) => {
        try {
            const query = `${filter}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
            const resp = await apiGetTransactions(query);
            console.log(resp);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    const getTransactionById = useCallback(async (id) => {
        try {
            const resp = await apiGetTransactionById(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    const createTransaction = useCallback(async (data) => {
        try {
            const resp = await apiCreateTransaction(data);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    const updateTransaction = useCallback(async (id, data) => {
        try {
            const resp = await apiUpdateTransaction(id, data);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    const deleteTransaction = useCallback(async (id) => {
        try {
            const resp = await apiDeleteTransaction(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    return {
        getTransactions,
        getTransactionById,
        createTransaction,
        updateTransaction,
        deleteTransaction,
    }
}

export default useTransaction