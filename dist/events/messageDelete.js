"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snipes_1 = require("../models/snipes");
module.exports = (client, message) => {
    if (!message.guild)
        return;
    snipes_1.snipes.set(message.channel.id, {
        author: message.author,
        content: message.content,
        authorID: message.author.id,
        url: message.author.displayAvatarURL({ dynamic: true }),
    });
};
