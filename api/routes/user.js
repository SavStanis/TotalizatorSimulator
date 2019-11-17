const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const userMethods = require('../controllers/userMethods');
const tokensMethods = require('../controllers/tokensMethods');

router.post('/registration', userMethods.registerUser);
router.post('/login', auth.signIn);
router.post('/balance-replenishment', auth.userAuthentication, userMethods.balanceReplenishment);
router.get('/get-info', auth.userAuthentication, userMethods.getInfo);
router.get('/get-all-users', auth.adminAuthentication, userMethods.getAllUsers);
router.delete('/delete', auth.userAuthentication, userMethods.deleteUserByID);

router.get('/check-token', tokensMethods.checkToken);
router.post('/refresh-tokens', tokensMethods.refreshTokens);

module.exports = router;