"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliases = exports.commands = exports.prefixToExport = exports.db = exports.client = void 0;
const commandHandler_1 = require("./utils/commandHandler");
const client_1 = require("./client/client");
Object.defineProperty(exports, "client", { enumerable: true, get: function () { return client_1.client; } });
const commands_1 = require("./utils/commands");
Object.defineProperty(exports, "commands", { enumerable: true, get: function () { return commands_1.commands; } });
Object.defineProperty(exports, "aliases", { enumerable: true, get: function () { return commands_1.aliases; } });
const dataOptions_1 = require("./models/dataOptions");
const checkDB_1 = require("./functions/checkDB");
const events_1 = __importDefault(require("./utils/events"));
const working_1 = require("./utils/working");
const { slayersDB } = require("slayer.db");
const db = new slayersDB(dataOptions_1.dataOptions);
exports.db = db;
require("dotenv").config();
let prefixToExport = process.env.PREFIX;
exports.prefixToExport = prefixToExport;
setInterval(() => {
    working_1.check(db);
});
checkDB_1.checkDB();
events_1.default.run(client_1.client);
client_1.client.on("message", (message) => {
    commandHandler_1.commandHandler(message);
});
client_1.client.on("messageUpdate", (_, newMessage) => {
    commandHandler_1.commandHandler(newMessage);
});
