// @ts-ignore
import fs from "fs";
import { Logger } from "../logger";

const config = {
    "webport": 8080,
    "defaultlang": "en",
}

export async function createConfig() {
    // check if the ./data folder exists
    if (!fs.existsSync("./data")) {
        // if not, create it
        Logger.info("Config", "Creating data folder...");
        fs.mkdirSync("./data");
        Logger.info("Config", "Data folder created!");
    }

    // check if the ./data/config.json file exists
    if (!fs.existsSync("./data/config.json")) {
        // if not, create it
        Logger.info("Config", "Creating config file...");
        fs.writeFileSync("./data/config.json", JSON.stringify(config, null, 4));
        Logger.info("Config", "Created config file!");
    }

    // check if the config file contains all keys
    Logger.info("Config", "Validating config file...");
    const configFile = JSON.parse(fs.readFileSync("./data/config.json").toString());
    for (const key in config) {
        if (!configFile.hasOwnProperty(key)) {
            // @ts-ignore
            configFile[key] = config[key];
            Logger.info("Config", "Added missing key '" + key + "' to config file");
        }
    }

    // write the config file
    fs.writeFileSync("./data/config.json", JSON.stringify(configFile, null, 4));
    Logger.info("Config", "Validated config file!");
}