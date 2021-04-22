import { db } from "../index";
import {
  findOne,
  getName,
  getRandom,
  isLoggedIn,
} from "../functions/importAll";
module.exports = {
  name: "give",
  category: "economy",
  usage: "[@user] [amount]",
  description: "Give money to another user",
  aliases: ["gift"],
  run: (client, message, args) => {
    if (!isLoggedIn(message.author.id)) {
      return message.channel.send("You are not logged into an account");
    }

    let { data } = findOne(getName(message.author.id));

    let currency = data.currency;

    let wallet = currency.wallet || 0;

    let user = message.mentions.users.first();
    let amount = args[1];

    if (!user) return message.channel.send("No user was mentioned");
    if (!amount) return message.channel.send("No amount was given");

    amount = Number(amount);

    if (!amount) return message.channel.send("The amount must be a number");

    if (!isLoggedIn(user.id))
      return message.channel.send("The user is not logged into an account");

    let xz = findOne(getName(user.id));

    let dat = xz.data;

    let cc = dat.currency;

    if (!cc) {
      db.set(`account_${getName(user.id)}.currency`, {});

      xz = findOne(getName(user.id));

      dat = xz.data;

      cc = dat.currency;
    }

    let wal = cc.wallet || 0;

    if (amount > wallet)
      return message.channel.send("You cannot give more than you have");

    db.set(
      `account_${getName(message.author.id)}.currency.wallet`,
      wallet - amount
    );
    db.set(`account_${getName(user.id)}.currency.wallet`, wal + amount);

    message.channel.send(
      `Successfully transfered ${amount} to ${user.username}`
    );

    db.save();
  },
};
