const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const userMethods = require('../controllers/userMethods');
const tokensMethods = require('../controllers/tokensMethods');

router.post('/registration', userMethods.registerUser);
router.post('/login', auth.signIn);
router.post('/replenishment', auth.userAuthentication, userMethods.balanceReplenishment);
router.get('/info', auth.userAuthentication, userMethods.getInfo);
router.get('/allUsers', auth.adminAuthentication, userMethods.getAllUsers);
router.delete('/delete', auth.userAuthentication, userMethods.deleteUserByID);

router.get('/checkToken', tokensMethods.checkToken);
router.post('/refreshTokens', tokensMethods.refreshTokens);

router.get('/messages', auth.userAuthentication, userMethods.getMessages);

module.exports = router;