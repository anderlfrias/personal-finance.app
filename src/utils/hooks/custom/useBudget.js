import {
    useCallback,
} from 'react';
import { useSelector } from 'react-redux'
import {
    apiGetBudgets,
    apiGetBudgetById,
    apiCreateBudget,
    apiUpdateBudget,
} from 'services/BudgetService.js'
import { FailedResponse, SuccessResponse } from 'utils/response';

function useBudget() {
    const user = useSelector((state) => state.auth.user)

    const getBudgets = useCallback(async (filter = '') => {
        try {
            const resp = await apiGetBudgets(filter);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    const getBudgetById = useCallback(async (id) => {
        try {
            const resp = await apiGetBudgetById(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    const createBudget = useCallback(async (data) => {
        try {
            const resp = await apiCreateBudget({...data, user: user.id});
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [user.id]);

    const updateBudget = useCallback(async (id, data) => {
        try {
            const resp = await apiUpdateBudget(id, data);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    return {
        getBudgets,
        getBudgetById,
        createBudget,
        updateBudget,
    }
}

export default useBudget;