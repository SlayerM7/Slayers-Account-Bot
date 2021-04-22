"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const findOne_1 = require("../functions/findOne");
const moment_1 = __importDefault(require("moment"));
const findOneByAccountID_1 = require("../functions/findOneByAccountID");
const getName_1 = require("../functions/getName");
module.exports = {
    name: "account-info",
    description: "Get information on an account",
    category: "account",
    usage: "<account username OR id>",
    aliases: ["acc-info"],
    run: (client, message, args, db) => {
        let name = args.join(" ");
        if (!name)
            name = getName_1.getName(message.author.id) || null;
        if (!name)
            return message.channel.send("No account name or ID was given");
        if (Number(name)) {
            name = Number(name);
            let data = findOneByAccountID_1.findOneByAccountID(name);
            if (!data)
                return message.reply("Account ID is invalid");
            const embed = new discord_js_1.MessageEmbed()
                .setColor("RED")
                .addField("Username", data.username)
                .addField("Account ID", data.data.id)
                .addField("Creator", data.data.owner.username)
                .addField("Amount logged in", data.data.loggedIn.length)
                .addField("Created at", moment_1.default(data.createdAt).fromNow())
                .addField("Wallet", data.data.currency ? data.data.currency.wallet || 0 : 0)
                .addField("Bank", data.data.currency ? data.data.currency.bank || 0 : 0)
                .setThumbnail(data.data.owner.displayAvatarURL);
            message.channel.send(embed);
        }
        else {
            if (!db.has(`account_${name}`))
                return message.channel.send("That account does not exist");
            let data = findOne_1.findOne(name);
            const embed = new discord_js_1.MessageEmbed()
                .setColor("RED")
                .addField("Username", data.username)
                .addField("Account ID", data.data.id)
                .addField("Creator", data.data.owner.username)
                .addField("Amount logged in", data.data.loggedIn.length)
                .addField("Created at", moment_1.default(data.createdAt).fromNow())
                .addField("Wallet", data.data.currency ? data.data.currency.wallet || 0 : 0)
                .addField("Bank", data.data.currency ? data.data.currency.bank || 0 : 0)
                .setThumbnail(data.data.owner.avatarURL);
            message.channel.send(embed);
        }
    },
};
