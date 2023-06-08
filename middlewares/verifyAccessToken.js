// require("dotenv").config();
import jwt from "jsonwebtoken";
export default jwt.isValidToken = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authString = req.headers["authorization"].split(" ");
      if (authString[0] !== "Bearer") {
        return res
          .status(401)
          .send({ error: true, message: "UnAuthorized Access" });
      } else {
        // const token = req.cookies.jwt;
        // console.log("token", token);
        const verifyUser = jwt.verify(
          authString[1],
          process.env.ACCESS_TOKEN_SECRET_KEY
        );
        console.log("verifiedUser", verifyUser);
        return next();
      }
    } catch (err) {
      console.log(err);
      return res.status(403).send({ error: true, message: "Invalid Token" });
    }
  } else {
    return res
      .status(403)
      .send({ error: true, message: "UnAuthorized Access" });
  }
};
