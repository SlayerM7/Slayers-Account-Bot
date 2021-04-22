"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
module.exports = {
    name: "help",
    description: "Get full help menu or help with a command",
    usage: "<command>",
    run: (client, message, args) => {
        if (!args[0]) {
            let cmds = [];
            __1.commands.forEach((command) => {
                cmds.push(`${command.name} - ${command.description}`);
            });
            const embed = new discord_js_1.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setColor("BLUE")
                .setDescription(cmds.join("\n"))
                .setFooter(`Total of ${__1.commands.size} commands`);
            message.channel.send(embed);
        }
        else {
            let cmd = args[0];
            let command = __1.commands.get(cmd);
            if (!command)
                return message.channel.send("That command does not exist");
            const embed = new discord_js_1.MessageEmbed()
                .setColor("RED")
                .addField("Name", command.name)
                .addField("Description", command.description)
                .addField("Aliases", command.aliases ? command.aliases.join(", ") : "None")
                .addField("Category", command.category)
                .addField("Usage", command.usage
                ? `${__1.prefixToExport}${command.name} ${command.usage}`
                : "No usage given");
            message.channel.send(embed);
        }
    },
};
