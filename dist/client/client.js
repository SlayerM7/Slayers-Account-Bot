"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
require("dotenv").config();
const client = new discord_js_1.Client();
exports.client = client;
client.login(process.env.BOT_TOKEN);
