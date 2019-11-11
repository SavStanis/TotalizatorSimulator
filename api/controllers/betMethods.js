const Bet = require('../models/bet');
const User = require('../models/user');
const BetEvent = require('../models/betEvent');
const betEventMethods = require('../controllers/betEventMethods');

const createBet = async (request, responce) => {
    const {userID, eventID, answerNumber, betAmount} = request.body;

    if(!userID || !eventID || !answerNumber || !betAmount) {
        return responce.status(400).json({message: "Invalid request!"});
    }
    const user = await User.findById(userID);
    const betEvent = await BetEvent.findById(eventID);
    if(!user) {
        return responce.status(400).json({message: "Invalid user!"});
    }
    if(!betEvent) {
        return responce.status(400).json({message: "Invalid event!"});
    }
    if(answerNumber !== 1 && answerNumber !== 2) {
        return responce.status(400).json({message: "Invalid number of answer!"});
    }
    if(betAmount <= 0) {
        return responce.status(400).json({message: "Invalid bet amount!"});
    }
    if(user.moneyAmount < betAmount) {
        return responce.status(400).json({message: "Not enough money!"});
    }

    await Bet.create({
        userID: userID,
        betEventID: eventID,
        answerNumber: answerNumber,
        betAmount: betAmount,
    });
    const newAmount = user.moneyAmount - betAmount;
    await User.findByIdAndUpdate(userID,{moneyAmount: newAmount});
    console.log("EventID " + eventID);
    await betEventMethods.updateBetEvent(eventID, answerNumber, betAmount);
    responce.status(200).json({message: "success"});
};

const getAllBets = async (request, response) => {
    const bets = await Bet.find();
    response.status(200).json(bets);
};

const deleteBetsByBetEventID = async (betEventID) => {
    await Bet.remove({betEventID: betEventID});
};

module.exports = {createBet, getAllBets, deleteBetsByBetEventID};