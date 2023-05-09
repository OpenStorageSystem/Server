import { Logger } from "../logger";
// @ts-ignore
import fs from "fs";
import sqlite3 from "sqlite3";


export class DatabaseHandler {
    db: sqlite3.Database;

    constructor() {
        if (!fs.existsSync("./data")) {
            Logger.info("Database", "Creating data folder...");
            fs.mkdirSync("./data");
            Logger.info("Database", "Data folder created!");
        }

        Logger.info("Database", "Loading database...");

        this.db = new sqlite3.Database("./data/database.db", (err) => {
            if (err) {
                Logger.error("Error while creating database: " + err.message);
            } else {
                Logger.info("Database", "Database Loaded!");
            }
        });

        Logger.info("Database", "Initializing database...");
        
        // Initialize database
        this.db.run("CREATE TABLE IF NOT EXISTS users (username VARCHAR(255), token VARCHAR(255), settings JSON)", (err) => {
            if (err) {
                Logger.error("Error while creating table: " + err.message);
            }
        });

        Logger.info("Database", "Database initialized!");

    }
}