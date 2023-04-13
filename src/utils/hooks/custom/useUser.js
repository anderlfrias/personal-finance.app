import { useCallback } from "react"
import { apiGetUserById, apiUpdateUser, apiChangePassword } from "services/UserService"
import { FailedResponse, SuccessResponse } from "utils/response"

function useUser() {
	const getUserById = useCallback(async (id) => {
		try {
			const resp = await apiGetUserById(id)
			return SuccessResponse(resp.data)
		} catch (errors) {
			return FailedResponse(errors)
		}
	}, [])

    const updateUser = useCallback(async (id, data) => {
        try {
            const resp = await apiUpdateUser(id, data)
            return SuccessResponse(resp.data)
        } catch (errors) {
            return FailedResponse(errors)
        }
    }, [])

    const changePassword = useCallback(async (id, data) => {
        try {
            const resp = await apiChangePassword(id, data)
            return SuccessResponse(resp.data)
        } catch (errors) {
            return FailedResponse(errors)
        }
    }, [])

    return {
        getUserById,
        updateUser,
        changePassword
    }
}

export default useUser