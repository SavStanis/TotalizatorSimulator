const crypto = require('crypto');
const randomstring = require('randomstring');
const mongoose = require('mongoose');
const config = require('../config/app');
const User = require('../models/user');

mongoose.connect(config.MONGODB_URI + "/totalizator-simulator", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected!")).catch(err => console.log(err));

const registerUser = (request, response) => {

    const {email, login, password} = request.body;
    User.findOne({email: email}).exec((err, user) => {
        if(user)
            return response.status(400).json({error: "This email is already registered!"});
        else {
            const salt = randomstring.generate();
            const passwordHash  = crypto.createHash('sha256').update(password + salt).digest('base64');
            User.create({
                email: email,
                login: login,
                password: passwordHash,
                salt: salt,
            }).then(() => response.status(200).json({
                email: email,
                login: login,
                password: passwordHash,
                salt: salt,
            }));
        }
    });
};

const getAllUsers = (request, response) => {
    User.find().exec().then(users => response.json(users)).catch(err => console.log(err));
};


module.exports = {registerUser, getAllUsers};