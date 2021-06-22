import axios from "axios";

const httpService = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL_AXIOS
})

export default httpService