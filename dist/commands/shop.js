"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const shop_1 = require("../models/shop");
module.exports = {
    name: "shop",
    description: "See all items in the shop",
    category: "economy",
    run: (client, message, args, db) => {
        let data = [];
        shop_1.shop.map((s) => {
            data.push(`${s.item} - ${s.price} --> Required for ${s.worksRequired.length ? s.worksRequired.join(", ") : "0"} jobs`);
        });
        let embed = new discord_js_1.MessageEmbed()
            .setColor("BLUE")
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(data.join("\n"));
        message.channel.send(embed);
    },
};
