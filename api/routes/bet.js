const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const betMethods = require('../controllers/betMethods');

router.get('/myBets', auth.userAuthentication, betMethods.getBetsByUserID);
router.post('/create', auth.userAuthentication, betMethods.createBet);
router.get('/allBets', auth.adminAuthentication, betMethods.getAllBets);

module.exports = router;