module.exports = {
    ROLE: {
        admin: (permissions) => {
	        return Object.keys(permissions).reduce((acc, e) => {
		        Object.keys(permissions[e]).forEach(perm => {
			        acc += permissions[e][perm];
		        });
		        return acc;
	        }, 0);
        },
        reader: (permissions) => {
	        return Object.keys(permissions).reduce((acc, e) => {
		        Object.keys(permissions[e]).forEach(perm => {
			        if (perm.indexOf('READ') !== -1) {
				        acc += permissions[e][perm];
			        }
		        });
		        return acc;
	        }, 0);
        }
    },
    PERMISSIONS: {
        USER: {
	        CAN_CREATE: 1 << 3,
	        CAN_READ: 1 << 2,
	        CAN_UPDATE: 1 << 1,
	        CAN_DELETE: 1 << 0
        }
    },
    ERRORS: {
        UNKNOWN_ERROR: 0,
        NOT_FOUND: 1,
        AUTH: {
            NOT_FOUND: 2,
            INVALID: 3,
            UNAUTHORIZED: 6,
            WRONG_PASSWORD: 8
        },
        USERS: {
            NOT_FOUND: 4,
            CANNOT_CREATE_USER: 7,
            CANNOT_GET_USERS: 9
        },
        SESSION_EXPIRED: 5
    },
    NOTIFICATION: {
        USERS: {
            USER_CREATED: 0
        }
    },
	FOOTBALL: {
    	TEAM: ['YELLOW', 'WHITE']
	}
};
