const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const jwtConfig = require('../config/app').jwtConfig;

const Token = require('../models/token');
const User = require('../models/user');

class TokenController {
    createAccessToken = async (userID) => {
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

    createRefreshToken = () => {
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

    updateDB = async (userID, tokenID) => {
      await Token.findOneAndRemove({userID: userID});
      await Token.create({
          tokenID: tokenID,
          userID: userID,
      });
    };

    updateTokens = async (userID) => {
        const accessToken = await this.createAccessToken(userID);
        const refreshToken = this.createRefreshToken();
        await this.updateDB(userID, refreshToken.tokenID);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken.token,
        };
    };

    checkToken = async (request, response) => {
        let userToken = request.get('Authorization');
        if(!userToken) {
            return response.status(401).json({error: 'Token is not provided!'});
        }
        let payload;
        userToken = userToken.replace('Bearer ', '');
        try {
            payload = jwt.verify(userToken, jwtConfig.TOKEN_SECRET);
        } catch (e) {
            return response.status(400).json({error: 'Invalid token!'});
        }
        if(payload.type !== 'access')
            return response.status(400).json({error: 'Invalid token!'});
        response.status(200).json({message: "Token is valid"});
    };

    refreshTokens = async (request, response) => {
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
      const tokens = await this.updateTokens(token.userID);
      response.status(200).json(tokens);
    };
}
module.exports = TokenController;