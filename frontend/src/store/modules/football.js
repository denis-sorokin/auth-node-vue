const state = {
	activeTable: null
};

const getters = {
	getFootballActiveTable: state => state.activeTable
};

const actions = {
	SET_FOOTBALL_ACTIVE_TABLE ({ commit }, table) {
		commit('SET_ACTIVE_TABLE', table)
	}
};

const mutations = {
	SET_ACTIVE_TABLE (state, table) {
		state.activeTable = table
	}
};

export default {
	state,
	actions,
	mutations,
	getters
}
