module.exports = {
    API_PORT: 3001,
    MONGODB_URI: 'mongodb://ts-db:3002',
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
    basicAdmin: {
        LOGIN: 'admin',
        EMAIL: 'admin@ts.com',
        PASSWORD: 'administrator',
    }
};