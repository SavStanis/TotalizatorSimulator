const BetEvent = require('../models/betEvent');

const createBetEvent = async (request, response) => {
    const {question, answer1, answer2} = request.body;
    await BetEvent.create({
        question: question,
        answer1: answer1,
        answer2: answer2,
        coefficient1: 1,
        coefficient2: 1,
        Amount1: 1,
        Amount2: 1,
    });
    response.status(200).json({message: "New bet event was created."});
};

const getAllEvents = async (request, response) => {
  const events = await BetEvent.find();
  response.status(200).json(events);
};

module.exports = {createBetEvent, getAllEvents};