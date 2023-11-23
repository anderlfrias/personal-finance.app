import { useCallback } from "react"
import { apiGetUserById, apiUpdateUser, apiChangePassword } from "services/UserService"
import useResponse from "./useResponse"

function useUser() {
    const { FailedResponse, SuccessResponse } = useResponse()
	const getUserById = useCallback(async (id) => {
		try {
			const resp = await apiGetUserById(id)
			return SuccessResponse(resp.data)
		} catch (errors) {
			return FailedResponse(errors)
		}
	}, [FailedResponse, SuccessResponse])

    const updateUser = useCallback(async (id, data) => {
        try {
            const resp = await apiUpdateUser(id, data)
            return SuccessResponse(resp.data)
        } catch (errors) {
            return FailedResponse(errors)
        }
    }, [FailedResponse, SuccessResponse])

    const changePassword = useCallback(async (id, data) => {
        try {
            const resp = await apiChangePassword(id, data)
            return SuccessResponse(resp.data)
        } catch (errors) {
            return FailedResponse(errors)
        }
    }, [FailedResponse, SuccessResponse])

    return {
        getUserById,
        updateUser,
        changePassword
    }
}

export default useUser