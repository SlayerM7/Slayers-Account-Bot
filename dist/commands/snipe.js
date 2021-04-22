"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const snipes_1 = require("../models/snipes");
module.exports = {
    name: "snipe",
    description: "Snipe a deleted message",
    category: "fun",
    guildOnly: true,
    run: (client, message, args) => {
        let msg = snipes_1.snipes.get(message.channel.id);
        if (!msg)
            return message.channel.send("Nothing to snipe");
        let embed = new discord_js_1.MessageEmbed()
            .setColor("RED")
            .setAuthor(msg.author.username, msg.url)
            .setDescription(msg.content);
        message.channel.send(embed);
    },
};
