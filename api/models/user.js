const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    login: String,
    passwordHash: String,
    salt: String,
    moneyAmount: Number,
    isAdmin: Boolean,
});

module.exports = mongoose.model('User', UserSchema);