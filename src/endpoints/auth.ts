import { Logger } from "../modules/logger";
import { config, databaseHandler } from "../index";
import { sqlite3 } from "sqlite3";
import { Request, Response } from "express";

export function auth(req: Request, res: Response) {
    const json = JSON.stringify(req.query.json);

    console.log(json);
}