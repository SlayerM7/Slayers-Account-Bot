"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
module.exports = {
    name: "prefix",
    category: "config",
    description: "Change prefix of the server",
    usage: "[new prefix]",
    guildOnly: true,
    run: (client, message, args) => {
        let p = args.join(" ");
        if (!p)
            return message.channel.send(`Current prefix is: \`${index_1.prefixToExport}\``);
        index_1.db.set(`prefixes_${message.guild.id}`, p);
        message.channel.send(`Prefix set to: \`${p}\``);
        index_1.db.save();
    },
};
