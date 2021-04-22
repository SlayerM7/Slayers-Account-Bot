"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
module.exports = {
    category: "fun",
    description: "Tweet something",
    name: "tweet",
    usage: "[message]",
    guildOnly: true,
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.join(" "))
            return message.channel.send("No message was given to tweet");
        let msg = yield message.channel.send("Generating...");
        axios_1.default
            .get(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${args.join(" ")}`)
            .then(({ data }) => {
            if (data.success !== true) {
                msg.edit("Failed to generate image");
            }
            else {
                msg.edit(data.message);
            }
        })
            .catch(() => {
            msg.edit("Failed to generate image");
        });
    }),
};
