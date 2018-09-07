const state = {
    error: null
};

const getters = {
    getError: state => state.error
};

const actions = {
    SEND_ERROR ({ commit }, error) {
        commit('ERROR_TO_STORE', error)
    }
};

const mutations = {
    ERROR_TO_STORE (state, error) {
        state.error = error
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}
