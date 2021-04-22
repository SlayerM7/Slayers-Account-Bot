import { isLoggedIn } from "../functions/isLoggedIn";
import { getName } from "../functions/getName";
import { findOne } from "../functions/findOne";
import { MessageEmbed } from "discord.js";

module.exports = {
  name: "balance",
  aliases: ["bal"],
  usage: "<@user>",
  category: "economy",
  description: "Get the amount of balance a user has",
  run: (client, message, args, db) => {
    if (!isLoggedIn(message.author.id))
      return message.channel.send("You are not logged into any account");

    let user = message.mentions.users.first() || message.author;

    let data = findOne(getName(user.id));

    if (!isLoggedIn(user.id)) {
      return message.channel.send("The user is not logged into any account");
    }

    if (!data) return message.reply("Failed to find data");

    if (!data.data.currency) {
      db.set(`account_${getName(user.id)}.currency`, {});
      data = findOne(getName(user.id));
    }

    const embed = new MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
      .setColor("BLUE")
      .addField("Wallet", data.data.currency.wallet || 0)
      .addField("Bank", data.data.currency.bank || 0)
      .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }));

    message.channel.send(embed);
  },
};
