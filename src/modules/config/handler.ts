import * as configCreator from './creator';
import { Logger } from '../logger';
import fs from 'fs';

export class Config {
    config: JSON;

    constructor() {
        configCreator.createConfig();
    }

    load() {
        Logger.info("Config", "Loading Config File...");
        this.config = JSON.parse(fs.readFileSync("./data/config.json").toString());
        Logger.info("Config", "Loaded Config File!");
        return
    }

    reload () {
        Logger.info("Config", "Reloading Config File...");
        this.config = JSON.parse(fs.readFileSync("./data/config.json").toString());
        Logger.info("Config", "Reloaded Config File!");
        return
    }

    get(key: string) {
        // @ts-ignore
        return this.config[key];
    }
}