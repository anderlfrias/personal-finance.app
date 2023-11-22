import { useCallback } from 'react'
import { useSelector } from 'react-redux';
import {
    apiGetTransactions,
    apiGetTransactionById,
    apiCreateTransaction,
    apiUpdateTransaction,
    apiDeleteTransaction,
    apiGetTransactionByWalletId,
    apiGetTransactionByCategoryId,
} from 'services/TransactionService'
import { FailedResponse, SuccessResponse } from 'utils/response';

function useTransaction() {

    const user = useSelector((state) => state.auth.user)
    const getTransactions = useCallback(async (q = '') => {
        try {
            const resp = await apiGetTransactions(q);
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

    const getTransactionByWalletId = useCallback(async (id) => {
        try {
            const resp = await apiGetTransactionByWalletId(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    const getTransactionByCategoryId = useCallback(async (id) => {
        try {
            const resp = await apiGetTransactionByCategoryId(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    const createTransaction = useCallback(async (data) => {
        try {
            const resp = await apiCreateTransaction({...data, user: user.id});
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [user.id]);

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
        getTransactionByWalletId,
        getTransactionByCategoryId,
        createTransaction,
        updateTransaction,
        deleteTransaction,
    }
}

export default useTransaction