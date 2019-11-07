const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
   userID: String,
   betSubjectID: String,
   answer1: Boolean,
   betAmount: Number,
});

module.exports = mongoose.model('bet', betSchema);