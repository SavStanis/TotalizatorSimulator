module.exports = {
    API_PORT: 3000,
    MONGODB_URI: 'mongodb://localhost:27017',
    jwtConfig: {
        TOKEN_SECRET: 'Very Secret Word1324iuhgh122Jfj3hfi4djg5w812hg48hfl3',
        accessToken: {
            type: 'access',
            expiresIn: '4h',
        },
        refreshToken: {
            type: 'refresh',
            expiresIn: '2 days',
        }
    }
};