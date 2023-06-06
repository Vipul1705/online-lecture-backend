const jwt = require("jsonwebtoken");
const UserTokenSchema = require("../../models/UserTokens");

const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid refresh token" });
  }

  UserTokenSchema.findOne({ token: refreshToken }, (err, docs) => {
    if (!docs) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid refresh token" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      (err, tokenDetails) => {
        if (err) {
          return res
            .status(401)
            .json({ error: true, message: "Invalid refresh token" });
        }

        req.tokenDetails = tokenDetails;
        next();
      }
    );
  });
};

module.exports = verifyRefreshToken;
