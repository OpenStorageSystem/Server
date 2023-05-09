import { DatabaseHandler } from "./modules/database/handler";
import { Config } from "./modules/config/handler";
import { Logger } from "./modules/logger";
import express from "express";

const databaseHandler = new DatabaseHandler();
const config = new Config();
config.load();

Logger.info("Main", "Starting server on port " + config.get("webport"));

const app = express();

app.listen(config.get("webport"), () => {
    Logger.info("Main", "Server started on port " + config.get("webport"));
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/:module/:action", (req, res) => {
    // get the module and action from the url
    const module = req.params.module;
    const action = req.params.action;
    const json = req.query.json;

    if (!json) {
        const error = {"error": "No JSON provided"};
        res.json(error);
        return;
    }
});
