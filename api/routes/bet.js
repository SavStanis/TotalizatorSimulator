const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const betMethods = require('../controllers/betMethods');

router.get('/get-my-bets', auth.userAuthentication, betMethods.getBetsByUserID);
router.post('/make-a-bet', auth.userAuthentication, betMethods.createBet);
router.get('/get-all-bets', auth.adminAuthentication, betMethods.getAllBets);

module.exports = router;