require("dotenv").config({ path: ".env" });
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const corsOptions = require("./config/corsOptions");
const credentials = require("./config/credentials");
const fileUpload = require("express-fileupload");
const errorLogger = require("./middlewares/errorRequest");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Kolkata");

app = express();

app.use(fileUpload());
app.use(express.static("public"));
app.use(bodyParser.json());
//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
//Routes
app.use(errorLogger);

const mongoose = require("mongoose");
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.CON_STRING, connectionParams).then(() => {
  console.log("Connected to the database ");
  app.listen(process.env.PORT, () =>
    console.log("Listening at :", process.env.PORT)
  );
});
