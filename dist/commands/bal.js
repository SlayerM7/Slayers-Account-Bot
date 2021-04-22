"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isLoggedIn_1 = require("../functions/isLoggedIn");
const getName_1 = require("../functions/getName");
const findOne_1 = require("../functions/findOne");
const discord_js_1 = require("discord.js");
module.exports = {
    name: "balance",
    aliases: ["bal"],
    usage: "<@user>",
    category: "economy",
    description: "Get the amount of balance a user has",
    run: (client, message, args, db) => {
        if (!isLoggedIn_1.isLoggedIn(message.author.id))
            return message.channel.send("You are not logged into any account");
        let user = message.mentions.users.first() || message.author;
        let data = findOne_1.findOne(getName_1.getName(user.id));
        if (!isLoggedIn_1.isLoggedIn(user.id)) {
            return message.channel.send("The user is not logged into any account");
        }
        if (!data)
            return message.reply("Failed to find data");
        if (!data.data.currency) {
            db.set(`account_${getName_1.getName(user.id)}.currency`, {});
            data = findOne_1.findOne(getName_1.getName(user.id));
        }
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
            .setColor("BLUE")
            .addField("Wallet", data.data.currency.wallet || 0)
            .addField("Bank", data.data.currency.bank || 0)
            .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }));
        message.channel.send(embed);
    },
};
