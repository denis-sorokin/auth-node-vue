import Vue from 'vue'

const state = {
	sidebarStatus: false
};

const getters = {
	getSidebarStatus: state => state.sidebarStatus
};

const actions = {
	SET_SIDEBAR_STATUS ({ commit }, status) {
		commit('TOGGLE_STATUS', status)
	}
};

const mutations = {
	TOGGLE_STATUS (state, status) {
		state.sidebarStatus = status
	}
};

export default {
	state,
	actions,
	mutations,
	getters
}
