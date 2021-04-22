import { MessageEmbed } from "discord.js";
import { snipes } from "../models/snipes";

module.exports = {
  name: "snipe",
  description: "Snipe a deleted message",
  category: "fun",
  guildOnly: true,
  run: (client, message, args) => {
    let msg = snipes.get(message.channel.id);

    if (!msg) return message.channel.send("Nothing to snipe");

    let embed = new MessageEmbed()
      .setColor("RED")
      .setAuthor(msg.author.username, msg.url)
      .setDescription(msg.content);

    message.channel.send(embed);
  },
};
