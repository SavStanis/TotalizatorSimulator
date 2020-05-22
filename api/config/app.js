module.exports = {
    API_PORT: 3001,
    dbConfig: {
        MONGODB_URI: 'mongodb://ts-db:27017/',
        MONGO_DATABASE: 'totalizator-simulator',
    },
    jwtConfig: {
        TOKEN_SECRET: 'Very Secret Word1324iuhgh122Jfj3hfi4djg5w812hg48hfl3',
        accessToken: {
            type: 'access',
            expiresIn: '12h',
        },
        refreshToken: {
            type: 'refresh',
            expiresIn: '2 days',
        }
    },
    COMMISSION: 0.05,
    basicAdminConfig: {
        LOGIN: 'admin',
        EMAIL: 'admin@ts.com',
        PASSWORD: 'administrator',
    }
};