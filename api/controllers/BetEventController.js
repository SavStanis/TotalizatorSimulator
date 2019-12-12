const BetEvent = require('../models/betEvent');
const Bet = require('../models/bet');
const User = require('../models/user');
const Message = require('../models/messages');
const COMMISSION = require('../config/app').COMMISSION;

class BetEventController {
    createBetEvent = async (request, response) => {
        const {question, answer1, answer2} = request.body;
        if (!question || !answer1 || !answer2) {
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
            date: new Date().toDateString()
        });
        response.status(200).json({message: "New bet event was created."});
    };

    getAllEvents = async (request, response) => {
        const events = await BetEvent.find();
        const data = [];
        for (const event of events) {
            data.push({
                eventID: event._id,
                question: event.question,
                answer1: event.answer1,
                answer2: event.answer2,
                coefficient1: event.coefficient1,
                coefficient2: event.coefficient2,
                date: event.date
            });
        }
        data.reverse();
        response.status(200).json(data);
    };

    finishBetEvent = async (request, response) => {
        const {eventID, answerNumber} = request.body;
        if (!eventID || !answerNumber) {
            return response.status(400).json({message: 'Invalid request!'});
        }
        const bets = await Bet.find({betEventID: eventID});
        const event = await BetEvent.findById(eventID);
        if (!event) {
            return response.status(400).json({message: 'Invalid request!'});
        }
        const coef = (answerNumber === '1') ? event.coefficient1 : event.coefficient2;
        for (let bet of bets) {
            if (parseInt(answerNumber) === bet.answerNumber) {
                const userID = bet.userID;
                const user = await User.findById(userID);
                let moneyAmount = user.moneyAmount;
                console.log({moneyAmount});
                console.log(user.moneyAmount);
                console.log(bet.betAmount);
                moneyAmount += (bet.betAmount * coef);
                console.log({moneyAmount});
                Math.floor(moneyAmount);
                await User.findByIdAndUpdate(userID, {moneyAmount: moneyAmount});
                await Message.create({
                    userID: userID,
                    date: new Date().toDateString(),
                    mainText: `congratulations! You put ${bet.betAmount} and you won ${bet.betAmount * coef}!`
                })
            } else {
                await Message.create({
                    userID: bet.userID,
                    date: new Date().toDateString(),
                    mainText: `Unfortunatly you've lost ${bet.betAmount.toFixed(2)}!`
                })
            }
        }
        await Bet.deleteMany({betEventID: eventID});
        await BetEvent.findByIdAndRemove(eventID);
        response.status(200).json({message: 'success'});
    };

    updateCoef = (amount1, amount2) => {
        const sum = amount1 + amount2;
        let coefficient1 = ((sum / amount1) * (1 - COMMISSION)).toFixed(2);
        let coefficient2 = ((sum / amount2) * (1 - COMMISSION)).toFixed(2);
        if (coefficient1 < 1) {
            coefficient1 = 1;
        }
        if (coefficient2 < 1) {
            coefficient2 = 1;
        }
        if (coefficient1 > 50) {
            coefficient1 = 50;
        }
        if (coefficient2 > 50) {
            coefficient2 = 50;
        }
        return {coefficient1, coefficient2};
    };

    updateBetEvent = async (betEventID, answerNumber, betAmount) => {
        const betEvent = await BetEvent.findById(betEventID);
        let amount1 = parseFloat(betEvent.amount1);
        let amount2 = parseFloat(betEvent.amount2);
        (answerNumber === "1") ? amount1 += parseFloat(betAmount) : amount2 += parseFloat(betAmount);
        const {coefficient1, coefficient2} = this.updateCoef(amount1, amount2);
        await BetEvent.findByIdAndUpdate(betEventID, {
            amount1: amount1,
            amount2: amount2,
            coefficient1: coefficient1,
            coefficient2: coefficient2
        });
    };

    getEventByID = async (request, response) => {
        const {eventID} = request.query;
        const event = await BetEvent.findById(eventID);
        if (!event) {
            return response.status(404).json({message: "Event is not exist"});
        }
        response.status(200).json({
            question: event.question,
            answer1: event.answer1,
            answer2: event.answer2,
            coefficient1: event.coefficient1,
            coefficient2: event.coefficient2,
            date: event.date
        });
    };
}

module.exports = BetEventController;