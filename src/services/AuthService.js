import { REQUEST_HEADER_AUTH_KEY, URL } from 'constants/api.constant'
import ApiService from './ApiService'

export async function apiGetUserById (id) {
    return ApiService.fetchData({
        url: `${URL}/v1/user/${id}`,
        method: 'get'
    })
}
export async function apiSignIn (data) {
    return ApiService.fetchData({
        url: `${URL}/v1/user/login`,
        method: 'post',
        data
    })
}

export async function apiSignUp (data) {
    return ApiService.fetchData({
        url: `${URL}/v1/user`,
        method: 'post',
        data
    })
}

export async function apiConfirmEmail (token) {
    return ApiService.fetchData({
        url: `${URL}/v1/user/confirm-email`,
        method: 'post',
        headers: {
            [REQUEST_HEADER_AUTH_KEY] : `${token}`,
        }
    })
}

export async function apiSendConfirmEmail (data, token) {
    return ApiService.fetchData({
        url: `${URL}/v1/user/send-confirmation-email`,
        method: 'post',
        data,
        headers: {
            [REQUEST_HEADER_AUTH_KEY] : `${token}`,
        }
    })
}

export async function apiSignOut (data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data
    })
}

export async function apiForgotPassword (data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data
    })
}

export async function apiResetPassword (data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data
    })
}
