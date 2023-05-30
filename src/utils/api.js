import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASE_API_PATH
});

api.interceptors.request.use((config) => {
    config.headers = {
        Accept: 'application/json'
    };

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    },
);

export default api;