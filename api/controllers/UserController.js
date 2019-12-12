const randomstring = require('randomstring');
const User = require('../models/user');
const Token = require('../models/token');
const Message = require('../models/messages');
const crypto = require('crypto');

class UserController {
    registerUser = async (request, response) => {
        const {email, login, password} = request.body;
        const user = await User.findOne({email: email});
        if(user) {
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

    getAllUsers = async (request, response) => {
        const users = await User.find();
        response.status(200).json(users);
    };

    deleteUserByID = async (request, response) => {
        const userID = request.body.userID;
        await User.findOneAndRemove({_id: userID});
        await Token.findOneAndRemove({userID: userID});
        response.status(200).json({message: "User deleted"});
    };

    balanceReplenishment = async (request, response) => {
        const {userID, moneyAmount} = request.body;
        const user = await User.findById(userID);
        if(!user) {
            return response.status(400).json({message: "User is not existed!"});
        }
        if(moneyAmount <= 0) {
            return response.status(400).json({message: "Invalid money amount!"});
        }
        const newAmount = parseFloat(moneyAmount) + user.moneyAmount;
        await User.findByIdAndUpdate(userID, {moneyAmount: newAmount});
        await Message.create({
            userID: userID,
            mainText: `You replenished your balance by ${moneyAmount}`,
            date: new Date().toDateString()
        });

        response.status(200).json({message: "success"});
    };

    getInfo = async (request, response) => {
        const {userID} = request.body;
        const user = await User.findById(userID);
        if(!user) {
            return response.status(400).json({message: "User is not existed!"});
        }
        const userData = {
            email: user.email,
            login: user.login,
            moneyAmount: user.moneyAmount
        };
        response.status(200).json(userData);
    };

    getMessages = async (request, response) => {
        const {userID} = request.body;
        const messages = await Message.find({userID: userID});
        response.status(200).json(messages);
    };
}
module.exports = UserController;