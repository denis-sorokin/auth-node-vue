import api from '../../utils/interceptor'
import encrypt from "../../utils/encrypt";

const state = {
	activeTable: 'gamesList',
	players: [],
	games: []
};

const getters = {
	getActiveTable: state => state.activeTable,
	getPlayers: state => state.players,
	getGames: state => state.games,
};

const actions = {
	GET_USERS ({ commit }) {
		api.get('football/players')
			.then(res => {
				if (res.status === 200) {
					commit('SAVE_PLAYERS', res.data)
				}
			})
	},
	GET_GAMES ({ commit }) {
		api.get('football/games')
			.then(res => {
				if (res.status === 200) {
					commit('SAVE_GAMES', res.data)
				}
			})
	},
	SET_ACTIVE_TABLE ({ commit, dispatch }, table) {
		if (table === 'playersList') {
			dispatch('GET_USERS');
		} else if (table === 'gamesList') {
			dispatch('GET_GAMES');
		}
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
	},
	SAVE_GAMES (state, data) {
		state.games = data
	}
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
