import { useCallback } from "react"
import { onSignOutSuccess } from "store/auth/sessionSlice"
import { initialState, setUser } from "store/auth/userSlice"
import appConfig from "configs/app.config"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

export default function useResponse () {
	const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignOut = useCallback(() => {
		dispatch(onSignOutSuccess())
		dispatch(setUser(initialState))
		navigate(appConfig.unAuthenticatedEntryPath)
	}, [dispatch, navigate])

  const SuccessResponse = useCallback(( data = {} ) => {
    return {
      status: 'success',
      message: '',
      data
    }
  }, [])

  const FailedResponse = useCallback(( error ) => {
    console.log(error)
    if (error?.response?.status === 403) {
      handleSignOut()
      return {
        status: 'failed',
        message: 'errors.unauthorized',
        error
      }
    }
    return {
        status: 'failed',
        message: error?.response?.data?.messageCode ? `errors.${error?.response?.data?.messageCode}` : 'errors.unexpected',
        error
    }
  }, [handleSignOut])

  return {
    SuccessResponse,
    FailedResponse
  }
}
