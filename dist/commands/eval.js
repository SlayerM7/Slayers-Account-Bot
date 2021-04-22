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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require("dotenv").config();
module.exports = {
    name: "eval",
    description: "Evaluate code - Owner only",
    category: "owner",
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = message;
            let { author, guild, member } = message;
            if (message.author.id !== process.env.OWNER_ID)
                return message.channel.send("Only the bot owner can use this command");
            let code = args.join(" ");
            if (!code)
                return message.channel.send("No code was given");
            try {
                let x = eval(code);
                const embed = new discord_js_1.MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setColor("RED")
                    .setDescription(`\`\`\`js\n${x}\n\`\`\``);
                message.channel.send(embed);
            }
            catch (e) {
                message.channel.send("Failed to evaluate\n\nError: " + `\`${e}\``);
            }
        });
    },
};
