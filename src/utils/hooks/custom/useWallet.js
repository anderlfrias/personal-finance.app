import {
    useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import {
    apiGetWallets,
    apiGetWalletById,
    apiCreateWallet,
    apiUpdateWallet,
    apiDeleteWallet,
} from 'services/WalletServices';
import { FailedResponse, SuccessResponse } from 'utils/response';

function useWallet() {
    const user = useSelector((state) => state.auth.user)
    const getWallets = useCallback(async (filter = '') => {
        try {
            const resp = await apiGetWallets(filter);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    const getWalletById = useCallback(async (id) => {
        try {
            const resp = await apiGetWalletById(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    const createWallet = useCallback(async (data) => {
        try {
            const resp = await apiCreateWallet({...data, user: user.id});
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, [user.id]);

    const updateWallet = useCallback(async (id, data) => {
        try {
            const resp = await apiUpdateWallet(id, data);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    const deleteWallet = useCallback(async (id) => {
        try {
            const resp = await apiDeleteWallet(id);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }, []);

    return {
        getWallets,
        getWalletById,
        createWallet,
        updateWallet,
        deleteWallet,
    };
}

export default useWallet;