const BetEvent = require('../models/betEvent');

const createBetEvent = async (request, response) => {
    const {question, answer1, answer2} = request.body;
    await BetEvent.create({
        question: question,
        answer1: answer1,
        answer2: answer2,
        coefficient1: 1,
        coefficient2: 1,
        amount1: 1,
        amount2: 1,
    });
    response.status(200).json({message: "New bet event was created."});
};

const getAllEvents = async (request, response) => {
  const events = await BetEvent.find();
  response.status(200).json(events);
};

const deleteBetEventByID = (betEventID) => {
    BetEvent.findByIdAndRemove(betEventID);
};

const updateBetEvent = async (betEventID, answerNumber, betAmount) => {
    const betEvent = await BetEvent.findById(betEventID);
    let amount1 = betEvent.amount1;
    let amount2 = betEvent.amount2;
    (answerNumber === 1) ? amount1 += betAmount : amount2 += betAmount;
    //TODO: make coef update
    await BetEvent.findByIdAndUpdate(betEventID, {amount1: amount1, amount2: amount2});
};

module.exports = {createBetEvent, getAllEvents, deleteBetEventByID, updateBetEvent};