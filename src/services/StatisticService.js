import { URL } from "constants/api.constant";
import ApiService from "./ApiService";

export async function apiGetStatistics ( q ) {
    return ApiService.fetchData({
        url: `${URL}/v1/statistics?${q}`,
        method: 'get',
    })
}

export async function apiGetStatisticsByTimeFrame (timeFrame) {
    return ApiService.fetchData({
        url: `${URL}/v1/statistics/timeFrame?timeFrame=${timeFrame}`,
        method: 'get',
    })
}