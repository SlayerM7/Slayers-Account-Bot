import { Client, Message } from "discord.js";
import { db } from "../index";
import { getName, findOne, isLoggedIn } from "../functions/importAll";

module.exports = {
  name: "deposit",
  category: "economy",
  usage: "[amount]",
  description: "Deposit money from your wallet",
  aliases: ["dep"],
  /**
   *
   * @param {Client}client
   * @param {Message}message
   * @param {String[]}args
   */
  run: (client, message, args) => {
    if (!isLoggedIn(message.author.id)) {
      return message.channel.send("You are not logged into any account");
    }

    let { data } = findOne(getName(message.author.id));

    if (!data.currency)
      return message.channel.send("You have nothing in your wallet");

    let amt = args[0];
    if (!amt) return message.channel.send("No amount was given");

    let wallet = data.currency.wallet || 0;
    let bank = data.currency.bank || 0;

    if (amt === "all") amt = wallet;
    if (amt === "half") amt = wallet * 0.5;
    if (amt === "quarter") amt = wallet * 0.25;
    if (amt === "10%") amt = wallet * 0.1;

    if (amt !== "all" && amt !== "half" && amt !== "quarter" && amt !== "10%") {
      amt = Number(amt);
      if (!amt) return message.channel.send("Amount must be a Number");
    }

    db.set(
      `account_${getName(message.author.id)}.currency.wallet`,
      wallet - amt
    );
    db.set(`account_${getName(message.author.id)}.currency.bank`, bank + amt);

    message.channel.send("Successfully deposited " + amt);

    db.save();
  },
};
