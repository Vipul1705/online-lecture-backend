const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Kolkata`");

const errorLogFile = path.join(__dirname, "../logs/error.log");

const errorLogger = (err, req, res, next) => {
  if (err) {
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
    const message = `${timestamp}: ${err.stack}\n`;
    fs.appendFileSync(errorLogFile, message);
  }
  next();
};

module.exports = errorLogger;
