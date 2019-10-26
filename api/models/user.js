const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    login: String,
    password: String,
    salt: String,
});

module.exports = mongoose.model('User', UserSchema);