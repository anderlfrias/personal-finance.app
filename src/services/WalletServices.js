import { URL } from "constants/api.constant";
import ApiService from "./ApiService";


export async function apiGetWallets ( q ) {
    return ApiService.fetchData({
        url: `${URL}/v1/wallet?q=${q}`,
        method: 'get',
    })
}

export async function apiGetWalletById ( id ) {
    return ApiService.fetchData({
        url: `${URL}/v1/wallet/${id}`,
        method: 'get',
    })
}

export async function apiCreateWallet ( data ) {
    return ApiService.fetchData({
        url: `${URL}/v1/wallet`,
        method: 'post',
        data
    })
}

export async function apiUpdateWallet ( id, data ) {
    return ApiService.fetchData({
        url: `${URL}/v1/wallet/${id}`,
        method: 'put',
        data
    })
}

export async function apiDeleteWallet ( id ) {
    return ApiService.fetchData({
        url: `${URL}/v1/wallet/${id}`,
        method: 'delete',
    })
}