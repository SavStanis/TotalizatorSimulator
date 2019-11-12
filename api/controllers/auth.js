const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const TOKEN_SECRET = require('../config/app').jwtConfig.TOKEN_SECRET;
const tokenMethods = require('./tokensMethods');

const signIn = async (request, response) => {
    const {email, password} = request.body;
    const user = await User.findOne({email: email});
    if(!user)
        return response.status(400).json({errors: {message: 'Wrong email!'}});
    const salt = user.salt;
    if(crypto.createHash('sha256').update(password + salt).digest('base64') !== user.passwordHash)
        return response.status(400).json({errors: {message: 'Wrong password!'}});
    const tokens = await tokenMethods.updateTokens(user._id);
    response.status(200).json(tokens);
};

const userAuthentication = (request, response, next) => {
    let userToken = request.get('Authorization');
    if(!userToken) {
        return response.status(401).json({error: 'Token is not provided!'});
    }
    userToken = userToken.replace('Bearer ', '');
    let payload;
    try {
        payload = jwt.verify(userToken, TOKEN_SECRET);
    } catch (e) {
        return response.status(400).json({error: 'Invalid token!'});
    }
    if(payload.type !== 'access')
        return response.status(400).json({error: 'Invalid token!'});
    request.body.userID = payload.userID;
    next();
};

const adminAuthentication = (request, response, next) => {
    let userToken = request.get('Authorization');
    userToken = userToken.replace('Bearer ', '');
    let payload = jwt.verify(userToken, TOKEN_SECRET);
    if(!payload.isAdmin) {
        return response.status(403).json({error: 'Permisson denied!'});
    }
    next();
};

module.exports = {signIn, userAuthentication, adminAuthentication};