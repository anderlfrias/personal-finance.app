// import {
//     useCallback,
// } from 'react';
import {
    apiGetWallets,
    // apiGetWalletById,
    // apiCreateWallet,
    // apiUpdateWallet,
    // apiDeleteWallet,
} from 'services/WalletServices';
import { FailedResponse, SuccessResponse } from 'utils/response';

function useWallet() {
    async function getWallets(filter = '') {
        try {
            const resp = await apiGetWallets(filter);
            return SuccessResponse(resp.data);
        } catch (error) {
            return FailedResponse(error);
        }
    }

    return {
        getWallets,
    };
}

export default useWallet;