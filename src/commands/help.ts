import { MessageEmbed } from "discord.js";
import { commands, prefixToExport } from "..";
import { help } from "../models/interfaces/help";

module.exports = {
  name: "help",
  description: "Get full help menu or help with a command",
  usage: "<command>",
  run: (client, message, args) => {
    if (!args[0]) {
      let cmds = [];

      commands.forEach(<help>(command) => {
        cmds.push(`${command.name} - ${command.description}`);
      });


      const embed = new MessageEmbed()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )

        .setColor("BLUE")
        .setDescription(cmds.join("\n"))
        .setFooter(`Total of ${commands.size} commands`);

      message.channel.send(embed);
    } else {
      let cmd = args[0];

      let command = <help>commands.get(cmd);

      if (!command) return message.channel.send("That command does not exist");

      const embed = new MessageEmbed()
        .setColor("RED")
        .addField("Name", command.name)
        .addField("Description", command.description)
        .addField(
          "Aliases",
          command.aliases ? command.aliases.join(", ") : "None"
        )
        .addField("Category", command.category)
        .addField(
          "Usage",
          command.usage
            ? `${prefixToExport}${command.name} ${command.usage}`
            : "No usage given"
        );

      message.channel.send(embed);
    }
  },
};
