const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const Auth = new AuthController();

const UserController = require('../controllers/UserController');
const User = new UserController();

const TokenController = require('../controllers/TokenController');
const Token = new TokenController();

router.post('/registration', User.registerUser);
router.post('/login', Auth.signIn);
router.post('/replenishment', Auth.userAuthentication, User.balanceReplenishment);
router.get('/info', Auth.userAuthentication, User.getInfo);
router.get('/allUsers', Auth.adminAuthentication, User.getAllUsers);
router.delete('/delete', Auth.userAuthentication, User.deleteUserByID);

router.get('/checkToken', Token.checkToken);
router.post('/refreshTokens', Token.refreshTokens);

router.get('/messages', Auth.userAuthentication, User.getMessages);

module.exports = router;