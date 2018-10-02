export default {
    getToken () {
        return localStorage.getItem('authToken');
    },
    setToken (token) {
        localStorage.setItem('authToken', token)
    },
    removeToken () {
        localStorage.clear()
    }
}
