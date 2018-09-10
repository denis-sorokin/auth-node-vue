import axios from 'axios'
import store from '../store'
import token from './tokenLocal'

const api = axios.create({
    baseURL: 'http://127.0.0.1:3000/api/'
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
    if (error.response) {
        if (errorClearToken.includes(error.response.status)) {
            const msg = error.response.data.error;
            console.log(Object.keys(error))
            store.dispatch('SEND_ERROR', msg);
        }
        token.removeToken()
    }
    store.dispatch('SEND_ERROR', 0);
    return Promise.reject(error)
});

export default api
