// src/api/httpClient.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://warranty-guard-one.vercel.app',
    timeout: 10000,
    withCredentials: true
});

export default axiosInstance;