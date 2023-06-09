import jwt from "jsonwebtoken";
import { UserToken } from "../models/UserToken.js";

const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid refresh token" });
  }

  UserToken.findOne({ token: refreshToken }, (err, docs) => {
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

export default verifyRefreshToken;
