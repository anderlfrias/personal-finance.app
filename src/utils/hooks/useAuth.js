import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignIn, apiSignUp, apiConfirmEmail, apiSendConfirmEmail, apiForgotPassword, apiResetPassword } from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import jwt_decode from "jwt-decode";
import { FailedResponse, SuccessResponse } from 'utils/response'
import { useCallback } from 'react'

function useAuth() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

	const query = useQuery()

    const { token, signedIn, user } = useSelector((state) => state.auth.session)

    const signIn = async (values) => {
    try {
			const resp = await apiSignIn(values)
			if (resp.data?.token) {
				console.log(resp.data)
				const { token } = resp.data;
				// const decoded = jwt_decode(token); // delete this

				const user = {
					...resp.data.user,
					avatar: resp.data.user?.profilePic || '',
					authority: [resp.data.user.role.toUpperCase()]
				}
				// delete user.role; // also delete this

				if (user.isActive) {
					dispatch(onSignInSuccess(token))
					dispatch(setUser(user))
					const redirectUrl = query.get(REDIRECT_URL_KEY)
					navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)

					return SuccessResponse()
				}

				navigate(`/send-confirm-email/${token}`, { replace: true, state: { email: user.email } })
			}

			throw Error()
		} catch (errors) {
			return FailedResponse(errors)
		}
    }

	const signUp = async (values) => {
        try {
			const data = {
				...values,
				name: values.name.trim(),
				firstSurname: values.firstSurname.trim(),
				secondSurname: values.secondSurname.trim(),
			}
			const resp = await apiSignUp(data)
			if (resp.data) {
				const { token } = resp.data;
				const decoded = jwt_decode(token);
				const user = {
					...decoded,
					avatar: '',
					authority: [decoded.role.toUpperCase()]
				}
				delete user.role;

				if (user.isActive) {
					dispatch(onSignInSuccess(token))
					dispatch(setUser(user))
					const redirectUrl = query.get(REDIRECT_URL_KEY)
					navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)

					return SuccessResponse()
				}
				navigate(`/send-confirm-email/${token}`, { replace: true, state: { email: user.email } })
			}
		} catch (errors) {
			return FailedResponse(errors)
		}
    }

	const confirmEmail = useCallback(async (token) => {
		try {
			const resp = await apiConfirmEmail(token)
			return SuccessResponse(resp.data)
		} catch (errors) {
			return FailedResponse(errors)
		}
	}, [])

	const sendConfirmEmail = useCallback(async (token) => {
		try {
			const data = {
				confirmEmailLink: `${window.location.origin}/confirm-email`
			}

			const resp = await apiSendConfirmEmail(data, token)
			return SuccessResponse(resp.data)
		} catch (errors) {
			return FailedResponse(errors)
		}
	}, [])

	const forgotPassword = useCallback(async (values) => {
		try {
			const data = {
				...values,
				forgotPasswordLink: `${window.location.origin}/reset-password`
			}
			const resp = await apiForgotPassword(data)
			return SuccessResponse(resp.data)
		} catch (errors) {
			return FailedResponse(errors)
		}
	}, [])

	const resetPassword = useCallback(async (values, token) => {
		try {
			const resp = await apiResetPassword(values, token)
			return SuccessResponse(resp.data)
		} catch (errors) {
			return FailedResponse(errors)
		}
	}, [])

    const handleSignOut = ()  => {
		dispatch(onSignOutSuccess())
		dispatch(setUser(initialState))
		navigate(appConfig.unAuthenticatedEntryPath)
	}

    const signOut = async () => {
		handleSignOut()
	}

    return {
			user,
			activated: user && user.isActive,
			authenticated: token && signedIn,
			signIn,
			signUp,
			signOut,
			confirmEmail,
			sendConfirmEmail,
			forgotPassword,
			resetPassword
    }
}

export default useAuth