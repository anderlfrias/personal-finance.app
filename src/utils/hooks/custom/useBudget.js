import {
    useCallback,
} from 'react';
import { useSelector } from 'react-redux'
import {
    apiGetBudgets,
    apiGetBudgetById,
    apiCreateBudget,
    apiUpdateBudget,
    apiDeleteBudget,
} from 'services/BudgetService.js'
import useResponse from './useResponse';

function useBudget() {
    const { FailedResponse, SuccessResponse } = useResponse()
    const user = useSelector((state) => state.auth.user)

    const getBudgets = useCallback(async ({filter = '', active = false}) => {
        try {
            const resp = await apiGetBudgets(filter, active);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const getBudgetById = useCallback(async (id) => {
        try {
            const resp = await apiGetBudgetById(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const createBudget = useCallback(async (data) => {
        try {
            const resp = await apiCreateBudget({...data, user: user.id});
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [user.id, FailedResponse, SuccessResponse]);

    const updateBudget = useCallback(async (id, data) => {
        try {
            const resp = await apiUpdateBudget(id, data);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const deleteBudget = useCallback(async (id) => {
        try {
            const resp = await apiDeleteBudget(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    return {
        getBudgets,
        getBudgetById,
        createBudget,
        updateBudget,
        deleteBudget,
    }
}

export default useBudget;