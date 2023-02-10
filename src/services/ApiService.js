import axios from 'axios'

const ApiService = {
    async fetchData(param) {
        return axios(param)
    }
}

export default ApiService