"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliases = exports.commands = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
let aliases = new discord_js_1.Collection();
exports.aliases = aliases;
let commands = new discord_js_1.Collection();
exports.commands = commands;
let commandFolder = fs_1.default.readdirSync("./src/commands/");
for (let file of commandFolder) {
    let pullCmd = require(`../commands/${file.replace(".ts", "")}`);
    commands.set(pullCmd.name ? pullCmd.name : file, pullCmd);
    if (pullCmd.aliases) {
        pullCmd.aliases.forEach((alias) => aliases.set(alias, pullCmd.name));
    }
}
