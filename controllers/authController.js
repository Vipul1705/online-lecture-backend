const UserSchema = require("../models/User");
const UserTokenSchema = require("../models/UserToken");

const verifyLogin = async (req, res, next) => {};
const logout = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    console.log("cookie", cookies);
    console.log("refreshCookie", cookies.refreshToken);
    if (cookies.refreshToken === undefined) {
      return res.sendStatus(204);
    }
    const isTokenMatch = await UserTokenSchema.findOne({
      token: cookies.refreshToken,
    });

    if (isTokenMatch) {
      await UserTokenSchema.remove({ token: isTokenMatch.token });
    }
    res.clearCookie("refreshToken");
    return res.status(200).send({ error: false, message: "Logout Success" });
  } catch (err) {
    console.log("in catch block", err);
    next(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};

module.exports = {
  verifyLogin,
  logout,
};
