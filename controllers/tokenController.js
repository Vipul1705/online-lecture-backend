import jwt from "jsonwebtoken";

const refreshToken = async (req, res, next) => {
  try {
    console.log(req.tokenDetails);
    const { tokenDetails } = req;
    const payload = {
      user_id: tokenDetails.user_id,
      role: tokenDetails.role,
      name: tokenDetails.name,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "30m",
    });

    res.status(201).send({
      accessToken,
      message: "Access token Created Successfully",
    });
  } catch (err) {
    console.log("in catch block", err);
    next(err);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
};
export default { refreshToken };
