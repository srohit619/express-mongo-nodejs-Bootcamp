/*
Author: Rohit Shetty
Description: Most of the common utility functions should be defined here
UpdatedOn: 27-07-2023
*/

const fs = require("fs");

/*
Author: Rohit Shetty
Description: Reads the dbconfig file.
*/

function readConfig() {
    const dbConfigPath = "../config.json";
    const data = fs.readFileSync(dbConfigPath, "utf8");
    // console.log("dataa---" + data);
    return JSON.parse(data);
}

/*
Author: Rohit Shetty
Description: Generates Logs for every Activity.
*/

function logger(fileLocation, activity) {
    console.log("logger Running!!!");
    const date = new Date().toISOString().slice(0, 10); // Get the current date (YYYY-MM-DD)
    const logEntry = `${new Date().toISOString()} - ${activity}\n`;
    const filePath = `${fileLocation}/APILOG-${date}.log`;

    fs.appendFile(filePath, logEntry, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });
}

/*
Author: Rohit Shetty
Description: Get the Current Date and Time.
*/

function getCurrentDateTime() {
    const timestamp = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }); //.replace(/[^\d]/g, '/')
    return timestamp; // Adjust the date format as per your preference
}

module.exports = { readConfig, logger, getCurrentDateTime };