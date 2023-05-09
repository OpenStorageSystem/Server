import * as configCreator from './creator';
import { Logger } from '../logger';
import fs from 'fs';

export class Config {
    config: JSON;

    constructor() {
        configCreator.createConfig();
    }

    load() {
        this.config = JSON.parse(fs.readFileSync("./data/config.json").toString());
        Logger.info("Config", "Loaded Config File");
        return
    }

    reload () {
        this.config = JSON.parse(fs.readFileSync("./data/config.json").toString());
        Logger.info("Config", "Reloaded Config File");
        return
    }

    get(key: string) {
        // @ts-ignore
        return this.config[key];
    }
}