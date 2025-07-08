const moment = require('moment');
const fs = require('fs');


exports.writeErrorLog = async (req, error) => {
  const requestURL = req.protocol + "://" + req.get("host") + req.originalUrl;
  const requestBody = JSON.stringify(req.body);
  const date = moment().format("MMMM Do YYYY, h:mm:ss a");
  fs.appendFileSync(
    "errorLog.log",
    "REQUEST DATE : " +
    date +
    "\n" +
    "API URL : " +
    requestURL +
    "\n" +
    "API PARAMETER : " +
    requestBody +
    "\n" +
    "Error : " +
    error +
    "\n\n"
  );
};