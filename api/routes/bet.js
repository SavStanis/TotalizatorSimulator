const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const Auth = new AuthController();

const BetController= require('../controllers/BetController');
const Bet = new BetController();

router.get('/myBets', Auth.userAuthentication, Bet.getBetsByUserID);
router.post('/create', Auth.userAuthentication, Bet.createBet);
router.get('/allBets', Auth.adminAuthentication, Bet.getAllBets);

module.exports = router;