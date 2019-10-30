const crypto = require('crypto');
const randomstring = require('randomstring');
const mongoose = require('mongoose');
const config = require('../config/app');
const User = require('../models/user');

mongoose.connect(config.MONGODB_URI + "/totalizator-simulator", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected!")).catch(err => console.log(err));

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
        password: passwordHash,
        salt: salt,
    });
    response.status(200).json({success: true});
};

const getAllUsers = async (request, response) => {
    const users = await User.find();
    response.status(200).json(users);
};

module.exports = {registerUser, getAllUsers};