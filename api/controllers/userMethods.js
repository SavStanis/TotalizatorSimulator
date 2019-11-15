const randomstring = require('randomstring');
const User = require('../models/user');
const Token = require('../models/token');
const crypto = require('crypto');

const registerUser = async (request, response) => {
    const {email, login, password} = request.body;
    const user = await User.findOne({email: email});
    if(user) {
        //console.log("Someone's trying to register account using E-mail that's existed in db.");
        return response.status(400).json({errors: {email: "This email is already registered!"}});
    }
    if(!email || !login || !password) {
        return response.status(400).json({message: 'Invalid request'});
    }
    const salt = randomstring.generate();
    const passwordHash = crypto.createHash('sha256').update(password + salt).digest('base64');
    User.create({
        email: email,
        login: login,
        passwordHash: passwordHash,
        salt: salt,
        moneyAmount: 0,
        isAdmin: false,
    });
    response.status(200).json({message: 'success'});
};

const getAllUsers = async (request, response) => {
    const users = await User.find();
    response.status(200).json(users);
};

const deleteUserByID = async (request, response) => {
    const userID = request.body.userID;
    await User.findOneAndRemove({_id: userID});
    await Token.findOneAndRemove({userID: userID});
    response.status(200).json({message: "User deleted"});
};

const balanceReplenishment = async (request, response) => {
    const {userID, moneyAmount} = request.body;
    const user = await User.findById(userID);
    if(!user) {
        return response.status(400).json({message: "User is not existed!"});
    }
    if(moneyAmount <= 0) {
        return response.status(400).json({message: "Invalid money amount!"});
    }
    const newAmount = moneyAmount + user.moneyAmount;
    await User.findByIdAndUpdate(userID, {moneyAmount: newAmount});
    response.status(200).json({message: "success"});
};

const getInfo = async (request, response) => {
    const {userID} = request.body;
    const user = await User.findById(userID);
    if(!user) {
        return response.status(400).json({message: "User is not existed!"});
    }
    const info = {
        email: user.email,
        login: user.login,
        moneyAmount: user.moneyAmount
    };
    response.status(200).json(info);
};

module.exports = {registerUser, getAllUsers, deleteUserByID, balanceReplenishment, getInfo};