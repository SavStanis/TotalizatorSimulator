const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    login: String,
    passwordHash: String,
    salt: String,
});

module.exports = mongoose.model('User', UserSchema);