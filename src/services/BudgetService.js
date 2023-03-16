import { URL } from "constants/api.constant";
import ApiService from "./ApiService";

export async function apiGetBudgets ( q ) {
    return ApiService.fetchData({
        url: `${URL}/v1/budget?q=${q}`,
        method: 'get',
    })
}

export async function apiGetBudgetById ( id ) {
    return ApiService.fetchData({
        url: `${URL}/v1/budget/${id}`,
        method: 'get',
    })
}

export async function apiCreateBudget ( data ) {
    return ApiService.fetchData({
        url: `${URL}/v1/budget`,
        method: 'post',
        data
    })
}

export async function apiUpdateBudget ( id, data ) {
    return ApiService.fetchData({
        url: `${URL}/v1/budget/${id}`,
        method: 'put',
        data
    })
}

export async function apiDeleteBudget ( id ) {
    return ApiService.fetchData({
        url: `${URL}/v1/budget/${id}`,
        method: 'delete',
    })
}