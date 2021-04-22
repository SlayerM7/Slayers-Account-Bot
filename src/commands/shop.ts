import { MessageEmbed } from "discord.js";
import { shop } from "../models/shop";

module.exports = {
  name: "shop",
  description: "See all items in the shop",
  category: "economy",
  run: (client, message, args, db) => {
    let data = [];
    shop.map((s) => {
      data.push(
        `${s.item} - ${s.price} --> Required for ${
          s.worksRequired.length ? s.worksRequired.join(", ") : "0"
        } jobs`
      );
    });
    let embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(data.join("\n"));

    message.channel.send(embed);
  },
};
