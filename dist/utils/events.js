"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function run(client) {
    fs_1.default.readdir("./src/events/", (err, files) => {
        files.forEach((file) => {
            let eventName = file.split(".")[0];
            client.on(eventName, require(`../events/${eventName}`).bind(null, client));
        });
    });
}
exports.default = { run };
