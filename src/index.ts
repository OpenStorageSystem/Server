import { DatabaseHandler } from "./modules/database/handler";
import { Config } from "./modules/config/handler";
import { Logger } from "./modules/logger";
import express from "express";

export const databaseHandler = new DatabaseHandler();
export const config = new Config();
config.load();

Logger.info("Main", "Starting server on port " + config.get("webport") + "...");

const app = express();

app.listen(config.get("webport"), () => {
    Logger.info("Main", "Server started on port " + config.get("webport") + "!");
});

app.get("/", (req, res) => {
   //send ./ui/setup.html
   res.sendFile(__dirname + "/ui/setup.html");
});

app.get("/api/:module/:action", (req, res) => {
    // get the module and action from the url
    const module = req.params.module;
    const action = req.params.action;
    const json = req.query.json;

    // check if a file with the module name exists in ./endpoints
    if (!require("fs").existsSync("./endpoints/" + module + ".js")) {
        const error = {"error": "Module not found"};
        res.json(error);
        return;
    }

    // import the module
    const moduleFile = require("./endpoints/" + module + ".js");

    // check if the module has a function with the action name
    if (!moduleFile.hasOwnProperty(action)) {
        const error = {"error": "Action not found"};
        res.json(error);
        return;
    }

    if (!json) {
        const error = {"error": "No JSON provided"};
        res.json(error);
        return;
    }

    // run the function
    moduleFile[action](req, res);
});
