import { URL } from "constants/api.constant";
import ApiService from "./ApiService";


export async function apiGetCategories ( q ) {
    return ApiService.fetchData({
        url: `${URL}/v1/category?q=${q}`,
        method: 'get',
    })
}

export async function apiGetCategoryById ( id ) {
    return ApiService.fetchData({
        url: `${URL}/v1/category/${id}`,
        method: 'get',
    })
}

export async function apiCreateCategory ( data ) {
    return ApiService.fetchData({
        url: `${URL}/v1/category`,
        method: 'post',
        data
    })
}

export async function apiUpdateCategory ( id, data ) {
    return ApiService.fetchData({
        url: `${URL}/v1/category/${id}`,
        method: 'put',
        data
    })
}

export async function apiDeleteCategory ( id ) {
    return ApiService.fetchData({
        url: `${URL}/v1/category/${id}`,
        method: 'delete',
    })
}