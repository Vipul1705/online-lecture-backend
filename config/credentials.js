import { allowedOrigins } from "./allowedOrigins.js";

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  // if (allowedOrigins.includes(origin)) {
  //   res.setHeader("Access-Control-Allow-Origin", origin);
  // }
  // res.header("Access-Control-Allow-Credentials", true);
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  return next();
};

export default credentials;
