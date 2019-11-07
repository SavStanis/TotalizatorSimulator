const mongoose = require('mongoose');

const betEventSchema = new mongoose.Schema({
    question: String,
    answer1: String,
    answer2: String,
    coefficient1: Number,
    coefficient2: Number,
    Amount1: Number,
    Amount2: Number,
});

module.exports= mongoose.model('betEvent', betEventSchema);