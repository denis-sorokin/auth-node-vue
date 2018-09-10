module.exports = {
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
            CANNOT_CREATE_USER: 7
        },
        SESSION_EXPIRED: 5
    },
    NOTIFICATION: {
        USERS: {
            USER_CREATED: 0
        }
    }
};
