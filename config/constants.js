const _ = require('lodash');

module.exports = {
	ROLE: {
		admin: (permissions) => {
			return _.reduce(permissions, (result, value) => {
				_.each(value, e => {
					result += e
				});
				return result
			}, 0);
		},
		reader: (permissions) => {
			return _.reduce(permissions, (result, value) => {
				return result + value.CAN_READ
			}, 0);
		}
	},
	PERMISSIONS: {
		USER: {
			CAN_CREATE: 1 << 3,
			CAN_READ: 1 << 2,
			CAN_UPDATE: 1 << 1,
			CAN_DELETE: 1 << 0
		},
		FOOTBALL: {
			CAN_CREATE: 1 << 4,
			CAN_READ: 1 << 5,
			CAN_UPDATE: 1 << 6,
			CAN_DELETE: 1 << 7
		}
	},
	ERRORS: {
		UNKNOWN_ERROR: 0,
		NOT_FOUND: 1,
		AUTH: {
			NOT_FOUND: 2,
			INVALID: 3,
			UNAUTHORIZED: 6,
			WRONG_PASSWORD: 8,
			REQUIRED_USERNAME: 14,
			REQUIRED_PASSWORD: 15,
			REQUIRED_EMAIL: 16,
			INCORRECT_EMAIL: 17,
			INCORRECT_PASSWORD: 18
		},
		USERS: {
			NOT_FOUND: 4,
			CANNOT_CREATE_USER: 7,
			CANNOT_GET_USERS: 9
		},
		FOOTBALL: {
			NOT_FOUND_PLAYER: 10,
			CANNOT_GET_PLAYERS: 11,
			CANNOT_GET_GAMES: 12
		},
		SESSION_EXPIRED: 5,
		NOT_HAVE_PERMISSION: 13
	},
	NOTIFICATION: {
		USERS: {
			USER_CREATED: 0
		}
	},
	FOOTBALL: {
		TEAM: ['YELLOW', 'WHITE', 'WAITING']
	}
};
