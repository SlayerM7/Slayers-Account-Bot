"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getName_1 = require("../functions/getName");
const shop_1 = require("../models/shop");
const moment_1 = __importDefault(require("moment"));
const discord_js_1 = require("discord.js");
module.exports = {
    name: "inventory",
    description: "See your entire inventory",
    category: "economy",
    run(client, message, args, db) {
        let data = [];
        shop_1.shop.forEach((shopObj) => {
            if (db.has(`items_${shopObj.item}.${getName_1.getName(message.author.id)}`)) {
                let d = db.get(`items_${shopObj.item}.${getName_1.getName(message.author.id)}`);
                data.push(`You bought a *${shopObj.item}* for *${shopObj.price}* - ${moment_1.default(d.date).fromNow()}`);
            }
        });
        let embed = new discord_js_1.MessageEmbed()
            .setColor("BLUE")
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(data.join("\n"));
        message.channel.send(embed);
    },
};
