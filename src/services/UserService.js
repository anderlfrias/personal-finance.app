import { URL } from 'constants/api.constant'
import ApiService from './ApiService'

export async function apiGetUserById (id) {
    return ApiService.fetchData({
        url: `${URL}/v1/user/${id}`,
        method: 'get'
    })
}

export async function apiUpdateUser (id, data) {
    return ApiService.fetchData({
        url: `${URL}/v1/user/${id}`,
        method: 'put',
        data
    })
}