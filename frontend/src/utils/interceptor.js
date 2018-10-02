import axios from 'axios'
import store from '../store'
import router from '../router'
import token from './tokenLocal'

const api = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

const errorClearToken = [];

api.defaults.headers.common['Content-Type'] = 'text/plain';
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
	    store.dispatch('SEND_ERROR', error.response.data.error);

	    if (errorClearToken.includes(error.response.status)) {
		    router.push('logout')
        } else if (error.response.status === 403) {
	        router.push('/')
        }
    } else {
        store.dispatch('SEND_ERROR', { msg: 0 });
    }
    return Promise.reject(error)
});

export default api
