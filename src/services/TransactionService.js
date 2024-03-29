import ApiService from "./ApiService";
import { URL } from "constants/api.constant";

export async function apiGetTransactions ( q ) {
    return ApiService.fetchData({
        url: `${URL}/v1/transaction?${q}`,
        method: 'get',
    })
}

export async function apiGetTransactionById ( id ) {
    return ApiService.fetchData({
        url: `${URL}/v1/transaction/${id}`,
        method: 'get',
    })
}

export async function apiGetTransactionByWalletId ( id ) {
    return ApiService.fetchData({
        url: `${URL}/v1/transaction/wallet/${id}`,
        method: 'get',
    })
}

export async function apiGetTransactionByCategoryId ( id ) {
    return ApiService.fetchData({
        url: `${URL}/v1/transaction/category/${id}`,
        method: 'get',
    })
}

export async function apiCreateTransaction ( data ) {
    return ApiService.fetchData({
        url: `${URL}/v1/transaction`,
        method: 'post',
        data
    })
}

export async function apiUpdateTransaction ( id, data ) {
    return ApiService.fetchData({
        url: `${URL}/v1/transaction/${id}`,
        method: 'put',
        data
    })
}

export async function apiDeleteTransaction ( id ) {
    return ApiService.fetchData({
        url: `${URL}/v1/transaction/${id}`,
        method: 'delete',
    })
}

