const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    tokenID: String,
    userID: String,
});

module.exports = mongoose.model('Token', tokenSchema);