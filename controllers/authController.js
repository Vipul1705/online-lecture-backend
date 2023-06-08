import { User } from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { UserToken } from "../models/UserToken.js";
const verifyLogin = async (req, res, next) => {
  try {
    const user_id = req.body.userid;
    const password = req.body.pass;
    var userData = await User.findOne({
      user_id: user_id,
      password: password,
    });
    if (!userData) {
      res.status(404).send("UserID or password is wrong!");
    }
    const { access_token, refresh_token } = await generateToken(userData);
    console.log("refresh", refresh_token);
    res
      .status(200)
      .cookie("refreshToken", refresh_token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
      })
      .send({
        userData,
        accessToken: access_token,
        message: "Login Success",
      });
  } catch (err) {
    console.log("in catch block", err);
    next(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};
const logout = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    console.log("cookie", cookies);
    console.log("refreshCookie", cookies.refreshToken);
    if (cookies.refreshToken === undefined) {
      return res.sendStatus(204);
    }
    const isTokenMatch = await _findOne({
      token: cookies.refreshToken,
    });

    if (isTokenMatch) {
      await UserToken.remove({ token: isTokenMatch.token });
    }
    res.clearCookie("refreshToken");
    return res.status(200).send({ error: false, message: "Logout Success" });
  } catch (err) {
    console.log("in catch block", err);
    next(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};

export default {
  verifyLogin,
  logout,
};
