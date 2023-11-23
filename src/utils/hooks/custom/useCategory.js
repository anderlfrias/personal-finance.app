import {
    useCallback,
} from 'react';
import { useSelector } from 'react-redux'
import {
    apiGetCategories,
    apiGetCategoryById,
    apiCreateCategory,
    apiUpdateCategory,
    apiDeleteCategory,
} from 'services/CategoryService'
import useResponse from './useResponse';

function useCategory() {
    const { FailedResponse, SuccessResponse } = useResponse()
    const user = useSelector((state) => state.auth.user)

    const getCategories = useCallback(async (filter = '') => {
        try {
            const resp = await apiGetCategories(filter);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const getCategoryById = useCallback(async (id) => {
        try {
            const resp = await apiGetCategoryById(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const createCategory = useCallback(async (data) => {
        try {
            const resp = await apiCreateCategory({...data, user: user.id});
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [user.id, FailedResponse, SuccessResponse]);

    const updateCategory = useCallback(async (id, data) => {
        try {
            const resp = await apiUpdateCategory(id, data);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    const deleteCategory = useCallback(async (id) => {
        try {
            const resp = await apiDeleteCategory(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [FailedResponse, SuccessResponse]);

    return {
        getCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
    }
}

export default useCategory