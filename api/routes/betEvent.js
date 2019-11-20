const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const betEventMethods = require('../controllers/betEventMethods');

router.post('/create', auth.adminAuthentication, betEventMethods.createBetEvent);
router.get('/get-events', betEventMethods.getAllEvents);
router.get('/get-by-id', auth.userAuthentication, betEventMethods.getEventByID);
router.delete('/finish-event', auth.adminAuthentication, betEventMethods.finishBetEvent);

module.exports = router;