const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const betEventMethods = require('../controllers/betEventMethods');

router.post('/create', auth.adminAuthentication, betEventMethods.createBetEvent);
router.get('/events', betEventMethods.getAllEvents);
router.get('/byId', auth.userAuthentication, betEventMethods.getEventByID);
router.delete('/finish', auth.adminAuthentication, betEventMethods.finishBetEvent);

module.exports = router;