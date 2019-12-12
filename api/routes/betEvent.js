const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const Auth = new AuthController();

const BetEventController = require('../controllers/BetEventController');
const BetEvent = new BetEventController();

router.post('/create', Auth.adminAuthentication, BetEvent.createBetEvent);
router.get('/events', BetEvent.getAllEvents);
router.get('/byId', Auth.userAuthentication, BetEvent.getEventByID);
router.delete('/finish', Auth.adminAuthentication, BetEvent.finishBetEvent);

module.exports = router;