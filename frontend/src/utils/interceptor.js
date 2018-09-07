import axios from 'axios'
import store from '../store'
import token from './tokenLocal'

const api = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

const errorClearToken = [];

api.defaults.headers.common['Content-Type'] = 'application/json';
api.interceptors.request.use(function (config) {
    if (token.getToken()) {
        config.headers['Authorization'] = token.getToken()
    }
    return config
}, function (error) {
    return Promise.reject(error)
});

api.interceptors.response.use(function (response) {
    return response
}, (error) => {
    if (errorClearToken.includes(error.response.status)) {
        token.removeToken()
    }
    const msg = error.response.data.error.message;
    store.dispatch('SEND_ERROR', msg);
    return Promise.reject(error)
});

export default api
