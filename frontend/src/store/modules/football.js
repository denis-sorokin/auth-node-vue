import api from '../../utils/interceptor'
import encrypt from "../../utils/encrypt";

const state = {
	activeTable: null
};

const getters = {
	getFootballActiveTable: state => state.activeTable
};

const actions = {
	SET_FOOTBALL_ACTIVE_TABLE ({ commit }, table) {
		commit('SET_ACTIVE_TABLE', table)
	},
	FOOTBALL_REGISTER_IN_GAME ({ dispatch }, date) {
		api.post('football/register-in-game', encrypt.encryptAes(date))
			.then(res => {
				if (res.status === 200) {
					dispatch('SEND_MSG', res)
				}
			})
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
