import api from '../../utils/interceptor'
import _auth from '../../utils/tokenLocal'

const state = {
    token: '',
    user: null
};

const getters = {
    getUser: state => state.user,
    getToken: state => state.token
};

const actions = {
    AUTH_LOGIN({commit}, data) {
        return new Promise((resolve, reject) => {
            api.post('auth/login', data)
                .then(res => {
                    if (res.status === 200) {
                        const raw = res.data;
                        if (raw.user && raw.token) {
                            commit('SAVE_USER_TOKEN', raw.token);
                            commit('SAVE_USER_DATA', raw.user);
                            resolve()
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                    reject(err)
                })
        })
    },
    AUTH_LOGOUT({commit}) {
        return new Promise((resolve, reject) => {
            try {
                commit('REMOVE_USER_TOKEN');
                commit('REMOVE_USER_DATA');
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    },
};

const mutations = {
    SAVE_USER_TOKEN(state, token) {
        _auth.setToken(token);
        state.token = token
    },
    REMOVE_USER_TOKEN(state) {
        _auth.removeToken();
        state.token = ''
    },
    SAVE_USER_DATA(state, user) {
        state.user = user
    },
    REMOVE_USER_DATA(state) {
        state.user = null
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}
