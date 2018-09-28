import api from '../../utils/interceptor'
import encrypt from "../../utils/encrypt";

const state = {
	activeTable: '',
	players: []
};

const getters = {
	getActiveTable: state => state.activeTable,
	getPlayers: state => state.players
};

const actions = {
	GET_FOOTBALL_USERS ({ commit }) {
		api.get('football/players')
			.then(res => {
				if (res.status === 200) {
					commit('SAVE_PLAYERS', res.data)
				}
			})
	},
	SET_FOOTBALL_ACTIVE_TABLE ({ commit, dispatch }, table) {
		dispatch('GET_FOOTBALL_USERS');
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
	},
	SAVE_PLAYERS (state, data) {
		state.players = data
	}
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
