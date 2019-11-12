const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const jwtConfig = require('../config/app').jwtConfig;

const Token = require('../models/token');
const User = require('../models/user');

const createAccessToken = async (userID) => {
    const user = await User.findById(userID);
    const isAdmin = user.isAdmin;
    const payload = {
        userID: userID,
        type: jwtConfig.accessToken.type,
        isAdmin: isAdmin,
    };
    const options = {expiresIn: jwtConfig.accessToken.expiresIn};
    return jwt.sign(payload, jwtConfig.TOKEN_SECRET, options);
};

const createRefreshToken = () => {
  const tokenID = uuid();
  const payload = {
      tokenID: tokenID,
      type: jwtConfig.refreshToken.type,
  };
  const options = {
      expiresIn: jwtConfig.refreshToken.expiresIn,
  };
  return {
      tokenID: tokenID,
      token: jwt.sign(payload, jwtConfig.TOKEN_SECRET, options),
  }
};

const updateDB = async (userID, tokenID) => {
  await Token.findOneAndRemove({userID: userID});
  await Token.create({
      tokenID: tokenID,
      userID: userID,
  });
};

const updateTokens = async (userID) => {
    const accessToken = await createAccessToken(userID);
    const refreshToken = createRefreshToken();
    await updateDB(userID, refreshToken.tokenID);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken.token,
    };
};

const refreshTokens = async (request, response) => {
  const refreshToken = request.body.refreshToken;
  let payload;
  try {
      payload = jwt.verify(refreshToken, jwtConfig.TOKEN_SECRET);
  }catch (e) {
      if(e instanceof jwt.TokenExpiredError) {
          return response.status(400).json({error: 'Token expired!'});
      }else if(e instanceof jwt.JsonWebTokenError) {
          return response.status(400).json({error: 'Invalid token!'});
      }
  }
  if(payload.type !== 'refresh') {
      return response.status(400).json({error: 'Invalid token!'});
  }
  const token = await Token.findOne({tokenID: payload.tokenID});
  if(!token) {
      return response.status(400).json({error: 'Invalid token'});
  }
  const tokens = await updateTokens(token.userID);
  response.status(200).json(tokens);
};

module.exports = {updateTokens, refreshTokens};