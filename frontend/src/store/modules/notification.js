import Vue from 'vue'

const state = {
    msg: null
};

const getters = {
    getMessage: state => state.msg
};

const actions = {
    SEND_MSG ({ commit }, msg) {
        commit('MSG_TO_STORE', msg.data)
    },
    MSG_CLEAR ({ commit }) {
        commit('MSG_CLEAR_FROM_STORE')
    }
};

const mutations = {
    MSG_TO_STORE (state, msg) {
        state.msg = msg
    },
    MSG_CLEAR_FROM_STORE (state) {
        Vue.set(state, 'msg', null);
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}
