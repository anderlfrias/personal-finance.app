import axios from 'axios'
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from 'constants/api.constant'
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'

const getToken = () => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)

    return persistData.auth.session.token || ''
}

const accessToken = getToken()

const ApiService = {
    async fetchData(param) {
        return axios({
            ...param,
            headers: {
                [REQUEST_HEADER_AUTH_KEY] : `${TOKEN_TYPE}${accessToken}`,
            },
        })
    }
}

export default ApiService