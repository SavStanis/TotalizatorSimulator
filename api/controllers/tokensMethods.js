const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const uuid = require('uuid/v4');
const jwtConfig = require('../config/app').jwtConfig;

const createAccessToken = (userID) => {
    const payload = {
        userID: userID,
        type: jwtConfig.accessToken.type,
    };
    return jwt.sign(payload, jwtConfig.TOKEN_SECRET, {expiresIn: jwtConfig.accessToken.expiresIn});
};

const createRefreshToken = () => {
    const tokenID = uuid();
    console.log("New tokenID: " + tokenID);
    const payload = {
        tokenID: tokenID,
        type: jwtConfig.refreshToken.type,
    };
    return {
        tokenID: tokenID,
        token: jwt.sign(payload, jwtConfig.TOKEN_SECRET, {expiresIn: jwtConfig.refreshToken.expiresIn}),
    };
};

const updateDB = (userID, tokenID) => {
    Token.findOneAndRemove({userID: userID});
    Token.create({
        tokenID: tokenID,
        userID: userID,
    });
    return;
};

const updateTokens = (userID) => {
    const  accessToken = createAccessToken(userID);
    const refreshToken = createRefreshToken();
    updateDB(userID, refreshToken.tokenID);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken.token,
    };
};

const refreshTokens = (request, response) => {
    const refreshToken = request.body.refreshToken;
    let payload;
    try {
        payload = jwt.verify(refreshToken, jwtConfig.TOKEN_SECRET);
        if(payload.type !== 'refresh'){
            response.status(400).json({error: 'Invalid token1!'});
            return;
        }
    }catch (e) {
        if(e instanceof jwt.TokenExpiredError) {
            response.status(400).json({error: 'Token expired!'});
            return;
        }else {
            if(e instanceof jwt.JsonWebTokenError) {
                response.status(400).json({error: 'Invalid token2!'});
                return;
            }
        }
    }
    const token = Token.findOne({tokenID: payload.tokenID});

    if(token === null) {
        response.status(400).json({error: 'Invalid token3!'});
        return;
    }
    /*TODO: SOMWhERE HERE IS BUG WITH WRITING OF RESRESH TOKENS IN DB*/
    console.log("token: " + token);
    const tokens = updateTokens(token.userID);
    response.status(200).json(tokens);
};

module.exports = {updateTokens, refreshTokens};