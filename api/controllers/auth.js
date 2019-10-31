const randomstring = require('randomstring');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const TOKEN_SECRET = require('../config/app').jwtConfig.TOKEN_SECRET;
const tokenMethods = require('./tokensMethods');

const registerUser = async (request, response) => {
    const {email, login, password} = request.body;
    const user = await User.findOne({email: email});
    if(user) {
        console.log("Someone's trying to register account using E-mail that's existed in db.");
        return response.status(400).json({errors: {email: "This email is already registered!"}});
    }
    const salt = randomstring.generate();
    const passwordHash = crypto.createHash('sha256').update(password + salt).digest('base64');
    User.create({
        email: email,
        login: login,
        passwordHash: passwordHash,
        salt: salt,
    });
    response.status(200).json({success: true});
};

const getAllUsers = async (request, response) => {
    const users = await User.find();
    response.status(200).json(users);
};

const signIn = async (request, response) => {
    const {email, password} = request.body;
    const user = await User.findOne({email: email});
    if(!user)
        return response.status(400).json({error: 'Wrong email!'});
    const salt = user.salt;
    if(crypto.createHash('sha256').update(password + salt).digest('base64') !== user.passwordHash)
        return response.status(400).json({error: 'Wrong password!'});
    const tokens = await tokenMethods.updateTokens(user._id);
    response.status(200).json(tokens);
};

const userAuthentication = (request, response, next) => {
    const userToken = request.get('Authentication').replace('Bearer ', '');
    if(!userToken) {
        return response.status(401).json({error: 'Token is not provided!'});
    }
    let payload;
    try {
        payload = jwt.verify(userToken, TOKEN_SECRET);
    } catch (e) {
        return response.status(400).json({error: 'Invalid token!'});
    }
    if(payload.type !== 'access')
        return response.status(400).json({error: 'Invalid token!'});

    next();
};

module.exports = {registerUser, getAllUsers, signIn, userAuthentication};