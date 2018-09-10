import Vue from 'vue'

const state = {
    error: null
};

const getters = {
    getError: state => state.error
};

const actions = {
    SEND_ERROR ({ commit }, error) {
        commit('ERROR_TO_STORE', error)
    },
    ERROR_CLEAR ({ commit }) {
        commit('ERROR_CLEAR_FROM_STORE')
    }
};

const mutations = {
    ERROR_TO_STORE (state, error) {
        state.error = error
    },
    ERROR_CLEAR_FROM_STORE (state) {
        Vue.set(state, 'error', null);
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}
