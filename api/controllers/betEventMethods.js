const BetEvent = require('../models/betEvent');
const Bet = require('../models/bet');
const User = require('../models/user');

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

const finishBetEvent = async (request, response) => {
    const {eventID, answerNumber} = request.body;
    const bets = await Bet.find({betEventID: eventID});
    const event = await BetEvent.findById(eventID);
    const coef = (answerNumber === 1) ? event.coefficient1 : event.coefficient2;
    console.log(coef);
    for(let bet of bets) {
        if(answerNumber === bet.answerNumber) {
            const userID = bet.userID;
            const user = await User.findById(userID);
            let moneyAmount = user.moneyAmount;
            moneyAmount += bet.betAmount * coef;
            await User.findByIdAndUpdate(userID, {moneyAmount: moneyAmount});
        }
    }
    await Bet.deleteMany({betEventID: eventID});
    await BetEvent.findByIdAndRemove(eventID);
    response.status(200).json({message: 'success'});
};

const updateBetEvent = async (betEventID, answerNumber, betAmount) => {
    const betEvent = await BetEvent.findById(betEventID);
    let amount1 = betEvent.amount1;
    let amount2 = betEvent.amount2;
    (answerNumber === 1) ? amount1 += betAmount : amount2 += betAmount;

    //TODO: make coef update
    await BetEvent.findByIdAndUpdate(betEventID, {amount1: amount1, amount2: amount2});
};

module.exports = {createBetEvent, getAllEvents, finishBetEvent, updateBetEvent};