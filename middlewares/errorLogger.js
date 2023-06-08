import fs from "fs";
import moment from "moment-timezone";
import { fileURLToPath } from "url";
import path from "path";

moment.tz.setDefault("Asia/Kolkata");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errorLogFile = path.join(__dirname, "../logs/error.log");

const errorLogger = (req, res, next) => {
  if (err) {
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
    const message = `${timestamp}: ${err.stack}\n`;
    fs.appendFile(errorLogFile, message, (error) => {
      // Handle the error if one exists
      if (error) {
        console.error(`Error while writing to log file: ${error}`);
      }
    });
  }
  next();
};

export default errorLogger;
