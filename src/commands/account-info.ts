import { MessageEmbed } from "discord.js";
import { findOne } from "../functions/findOne";
import moment from "moment";
import { findOneByAccountID } from "../functions/findOneByAccountID";
import { getName } from "../functions/getName";

module.exports = {
  name: "account-info",
  description: "Get information on an account",
  category: "account",
  usage: "<account username OR id>",
  aliases: ["acc-info"],
  run: (client, message, args, db) => {
    let name = args.join(" ");
    if (!name) name = getName(message.author.id) || null;
    if (!name) return message.channel.send("No account name or ID was given");

    if (Number(name)) {
      name = Number(name);
      let data = findOneByAccountID(name);
      if (!data) return message.reply("Account ID is invalid");

      const embed = new MessageEmbed()
        .setColor("RED")
        .addField("Username", data.username)
        .addField("Account ID", data.data.id)
        .addField("Creator", data.data.owner.username)
        .addField("Amount logged in", data.data.loggedIn.length)
        .addField("Created at", moment(data.createdAt).fromNow())
        .addField(
          "Wallet",
          data.data.currency ? data.data.currency.wallet || 0 : 0
        )
        .addField("Bank", data.data.currency ? data.data.currency.bank || 0 : 0)
        .setThumbnail(data.data.owner.displayAvatarURL);

      message.channel.send(embed);
    } else {
      if (!db.has(`account_${name}`))
        return message.channel.send("That account does not exist");

      let data = findOne(name);

      const embed = new MessageEmbed()
        .setColor("RED")
        .addField("Username", data.username)
        .addField("Account ID", data.data.id)
        .addField("Creator", data.data.owner.username)
        .addField("Amount logged in", data.data.loggedIn.length)
        .addField("Created at", moment(data.createdAt).fromNow())
        .addField(
          "Wallet",
          data.data.currency ? data.data.currency.wallet || 0 : 0
        )
        .addField("Bank", data.data.currency ? data.data.currency.bank || 0 : 0)
        .setThumbnail(data.data.owner.avatarURL);

      message.channel.send(embed);
    }
  },
};
