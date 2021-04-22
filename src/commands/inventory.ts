import { getName } from "../functions/getName";
import { shop } from "../models/shop";
import moment from "moment";
import { MessageEmbed } from "discord.js";

module.exports = {
  name: "inventory",
  description: "See your entire inventory",
  category: "economy",
  run(client, message, args, db) {
    let data = [];

    shop.forEach((shopObj) => {
      if (db.has(`items_${shopObj.item}.${getName(message.author.id)}`)) {
        let d = db.get(`items_${shopObj.item}.${getName(message.author.id)}`);
        data.push(
          `You bought a *${shopObj.item}* for *${shopObj.price}* - ${moment(
            d.date
          ).fromNow()}`
        );
      }
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
