const jwt = require("jsonwebtoken");

const TokenManager = {
  generateAccessToken: (payload) =>
    jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_AGE,
    }),

  generateRefreshToken: (payload) =>
    jwt.sign(payload, process.env.REFRESH_TOKEN_KEY),

  verifyRefreshToken: (refreshToken) =>
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY),
};

module.exports = TokenManager;
