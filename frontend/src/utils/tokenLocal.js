import store from '../store'

export default {
    getToken () {
        return store.state.auth.token === localStorage.getItem('authToken')? store.state.auth.token : null;
    },
    setToken (token) {
        localStorage.setItem('authToken', token)
    },
    removeToken () {
        localStorage.clear()
    }
}
