const BetEvent = require('../models/betEvent');
const Bet = require('../models/bet');
const User = require('../models/user');
const COMMISSION = require('../config/app').COMMISSION;

const createBetEvent = async (request, response) => {
    const {question, answer1, answer2} = request.body;
    if(!question || !answer1 || !answer2) {
        return response.status(400).json({message: "Invalid request!"});
    }
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
    if(!eventID || !answerNumber) {
        return response.status(400).json({message: 'Invalid request!'});
    }
    const bets = await Bet.find({betEventID: eventID});
    const event = await BetEvent.findById(eventID);
    if(!event) {
        return response.status(400).json({message: 'Invalid request!'});
    }
    const coef = (answerNumber === 1) ? event.coefficient1 : event.coefficient2;
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

const updateCoef = (amount1, amount2) => {
  const sum = amount1 + amount2;
  let coefficient1 = ((sum / amount1) * (1 - COMMISSION)).toFixed(2);
  let coefficient2 = ((sum / amount2) * (1 - COMMISSION)).toFixed(2);
  if(coefficient1 < 1) {
      coefficient1 = 1;
  }
    if(coefficient2 < 1) {
        coefficient2 = 1;
    }
    if(coefficient1 > 50) {
        coefficient1 = 50;
    }
    if(coefficient2 > 50) {
        coefficient2 = 50;
    }
  return {coefficient1, coefficient2};
};

const updateBetEvent = async (betEventID, answerNumber, betAmount) => {
    const betEvent = await BetEvent.findById(betEventID);
    let amount1 = betEvent.amount1;
    let amount2 = betEvent.amount2;
    (answerNumber === 1) ? amount1 += betAmount : amount2 += betAmount;
    const {coefficient1, coefficient2} = updateCoef(amount1, amount2);
    await BetEvent.findByIdAndUpdate(betEventID, {
        amount1: amount1,
        amount2: amount2,
        coefficient1: coefficient1,
        coefficient2: coefficient2
    });
};

module.exports = {createBetEvent, getAllEvents, finishBetEvent, updateBetEvent};