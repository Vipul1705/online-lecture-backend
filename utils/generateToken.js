import jwt from "jsonwebtoken";
import { UserToken } from "../models/UserToken.js";
const generateToken = async (user) => {
  try {
    const payload = {
      user_id: user.user_id,
      name: user.name,
      role: user.role,
    };

    const access_token = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "30m" }
    );

    const refresh_token = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const user_token = await UserToken.findOne({ user_id: user.user_id });
    console.log("user_token", user_token);
    if (user_token) {
      await user_token.deleteOne();
      // await user_token.remove();
    }
    console.log("access_token", access_token);
    console.log("refresh_token", refresh_token);
    await new UserToken({
      user_id: user.user_id,
      token: refresh_token,
    }).save();
    return Promise.resolve({ access_token, refresh_token });
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
export default generateToken;
