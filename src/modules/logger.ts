import * as colors from 'colors';
// @ts-ignore
import fs from 'fs';

class LoggerClass {
    constructor() {
        // check if the ./logs folder exists
        if (!fs.existsSync("./logs")) {
            // if not, create it
            fs.mkdirSync("./logs");
        }

        // check if the ./logs/latest.log file exists
        if (!fs.existsSync("./logs/latest.log")) {
            // if not, create it
            fs.writeFileSync("./logs/latest.log", "");
        }else {
            // rename the file to the current date
            fs.renameSync("./logs/latest.log", "./logs/" + new Date().toISOString().split("T")[0] + ".log");
            // create a new latest.log file
            fs.writeFileSync("./logs/latest.log", "");
        }
    }

    /**
     * Log a message to the console
     * @param moduleName 
     * @param message 
     */
    info(moduleName: string, message: string) {
        console.log(colors.rainbow("[" + moduleName + "] ") + message);
        // write the message to the latest.log file
        fs.appendFileSync("./logs/latest.log", "[" + moduleName + "] " + message + "\n");
    }

    /**
     * 
     * @param message 
     */
    error(message: string) {
        console.log("[ERROR]".red + " " + message);
        // write the message to the latest.log file
        fs.appendFileSync("./logs/latest.log", "[ERROR] " + message + "\n");
    }
}

export const Logger = new LoggerClass();