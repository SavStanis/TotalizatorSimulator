const Bet = require('../models/bet');
const User = require('../models/user');
const BetEventModel = require('../models/betEvent');

const BetEventController = require('../controllers/BetEventController');
const BetEvent = new BetEventController();

class BetController {
    createBet = async (request, responce) => {
        const {userID, eventID, answerNumber, betAmount} = request.body;

        if (!userID || !eventID || !answerNumber || !betAmount) {
            return responce.status(400).json({message: "Invalid request!"});
        }
        const user = await User.findById(userID);
        const betEvent = await BetEventModel.findById(eventID);
        if (!user) {
            return responce.status(400).json({message: "Invalid user!"});
        }
        if (!betEvent) {
            return responce.status(400).json({message: "Invalid event!"});
        }
        if (answerNumber !== "1" && answerNumber !== "2") {
            return responce.status(400).json({message: "Invalid number of answer!"});
        }
        if (betAmount <= 0) {
            return responce.status(400).json({message: "Invalid bet amount!"});
        }
        if (user.moneyAmount < betAmount) {
            return responce.status(400).json({message: "Not enough money!"});
        }

        await Bet.create({
            userID: userID,
            betEventID: eventID,
            answerNumber: answerNumber,
            betAmount: betAmount,
        });
        const newAmount = user.moneyAmount - parseFloat(betAmount);
        await User.findByIdAndUpdate(userID, {moneyAmount: newAmount});
        await BetEvent.updateBetEvent(eventID, answerNumber, betAmount);
        responce.status(200).json({message: "success"});
    };

    getAllBets = async (request, response) => {
        const bets = await Bet.find();
        response.status(200).json(bets);
    };

    getBetsByUserID = async (request, response) => {
        const {userID} = request.body;
        const bets = await Bet.find({userID: userID});
        const responseBets = [];
        for (const bet of bets) {
            const betEventID = bet.betEventID;
            const event = await BetEventModel.findById(betEventID);
            const eventQuestion = event.question;
            const answer = (bet.answerNumber === 1) ? event.answer1 : event.answer2;
            const coefficient = (bet.answerNumber === 1) ? event.coefficient1 : event.coefficient2;
            const betAmount = bet.betAmount;
            responseBets.push({
                question: eventQuestion,
                answer: answer,
                coefficient: coefficient,
                betAmount: betAmount
            });
        }
        response.status(200).json(responseBets);
    };

    deleteBetsByBetEventID = async (betEventID) => {
        await Bet.remove({betEventID: betEventID});
    };
}

module.exports = BetController;