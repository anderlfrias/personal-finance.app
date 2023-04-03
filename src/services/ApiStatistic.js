import { URL } from "constants/api.constant";
import ApiService from "./ApiService";

export async function apiGetStatistics ( q ) {
    return ApiService.fetchData({
        url: `${URL}/v1/statistics?q=${q}`,
        method: 'get',
    })
}