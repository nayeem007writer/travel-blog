import axios from 'axios'
import { BASE_URL } from './constant'

const axiosInstant = axios.create({
    baseURL: BASE_URL,
    timeout:10000,
    headers: {
        "Content-Type": "application/json",
    }
})

axiosInstant.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
);

export default axiosInstant;