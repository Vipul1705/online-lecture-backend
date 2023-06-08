import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import credentials from "./config/credentials.js";
import corsOptions from "./config/corsOptions.js";
import authRouter from "./routes/authRoute.js";
import tokenRouter from "./routes/tokenRoute.js";
import errorLogger from "./middlewares/errorLogger.js";
import verifyAccessToken from "./middlewares/verifyAccessToken.js";
import verifyRefreshToken from "./middlewares/verifyRefreshToken.js";
import { connect } from "mongoose";
import instructorRouter from "./routes/instructorRoute.js";
import courseRouter from "./routes/courseRoute.js";
dotenv.config({ path: ".env" });

const app = express();

app.use(fileUpload());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(credentials);
app.use(cors(corsOptions));
// app.use(cors({ origin: "http://localhost:3000" }));
// Reorder the following middleware as needed for your application

app.use("/auth", authRouter);

// app.use(verifyAccessToken);
app.use("/instructor", instructorRouter);
app.use("/course", courseRouter);

app.use(verifyRefreshToken);
app.use("/refreshToken", tokenRouter);
app.use(errorLogger);

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

connect(process.env.CON_STRING, connectionParams).then(() => {
  console.log("Connected to the database");
  app.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
  });
});
