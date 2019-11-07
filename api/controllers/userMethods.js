const randomstring = require('randomstring');
const User = require('../models/user');
const Token = require('../models/token');
const crypto = require('crypto');

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
        moneyAmount: 0,
    });
    response.status(200).json({success: true});
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

module.exports = {registerUser, getAllUsers, deleteUserByID};