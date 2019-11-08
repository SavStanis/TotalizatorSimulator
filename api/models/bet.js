const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
   userID: String,
   betEventID: String,
   answerNumber: Number,
   betAmount: Number,
});

module.exports = mongoose.model('bet', betSchema);