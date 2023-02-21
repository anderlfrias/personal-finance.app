import axios from 'axios'
import { REQUEST_HEADER_AUTH_KEY } from 'constants/api.constant'
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'

const getToken = () => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)

    return persistData?.auth?.session?.token || ''
}

const accessToken = getToken()

const ApiService = {
    async fetchData(param) {
        return axios({
            ...param,
            headers: accessToken ? {
                [REQUEST_HEADER_AUTH_KEY] : `${accessToken}`,
            } : {},
        })
    }
}

export default ApiService