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
import useResponse from './useResponse';

function useTransaction() {
    const { FailedResponse, SuccessResponse } = useResponse()
    const user = useSelector((state) => state.auth.user)
    const getTransactions = useCallback(async (q = '') => {
        try {
            const resp = await apiGetTransactions(q);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const getTransactionById = useCallback(async (id) => {
        try {
            const resp = await apiGetTransactionById(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const getTransactionByWalletId = useCallback(async (id) => {
        try {
            const resp = await apiGetTransactionByWalletId(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const getTransactionByCategoryId = useCallback(async (id) => {
        try {
            const resp = await apiGetTransactionByCategoryId(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const createTransaction = useCallback(async (data) => {
        try {
            const resp = await apiCreateTransaction({...data, user: user.id});
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [user.id, FailedResponse, SuccessResponse]);

    const updateTransaction = useCallback(async (id, data) => {
        try {
            const resp = await apiUpdateTransaction(id, data);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const deleteTransaction = useCallback(async (id) => {
        try {
            const resp = await apiDeleteTransaction(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

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