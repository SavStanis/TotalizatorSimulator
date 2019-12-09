const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    userID: String,
    mainText: String,
    date: String
});

module.exports = mongoose.model('message', messageSchema);