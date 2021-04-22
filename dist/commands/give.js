"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const importAll_1 = require("../functions/importAll");
module.exports = {
    name: "give",
    category: "economy",
    usage: "[@user] [amount]",
    description: "Give money to another user",
    aliases: ["gift"],
    run: (client, message, args) => {
        if (!importAll_1.isLoggedIn(message.author.id)) {
            return message.channel.send("You are not logged into an account");
        }
        let { data } = importAll_1.findOne(importAll_1.getName(message.author.id));
        let currency = data.currency;
        let wallet = currency.wallet || 0;
        let user = message.mentions.users.first();
        let amount = args[1];
        if (!user)
            return message.channel.send("No user was mentioned");
        if (!amount)
            return message.channel.send("No amount was given");
        amount = Number(amount);
        if (!amount)
            return message.channel.send("The amount must be a number");
        if (!importAll_1.isLoggedIn(user.id))
            return message.channel.send("The user is not logged into an account");
        let xz = importAll_1.findOne(importAll_1.getName(user.id));
        let dat = xz.data;
        let cc = dat.currency;
        if (!cc) {
            index_1.db.set(`account_${importAll_1.getName(user.id)}.currency`, {});
            xz = importAll_1.findOne(importAll_1.getName(user.id));
            dat = xz.data;
            cc = dat.currency;
        }
        let wal = cc.wallet || 0;
        if (amount > wallet)
            return message.channel.send("You cannot give more than you have");
        index_1.db.set(`account_${importAll_1.getName(message.author.id)}.currency.wallet`, wallet - amount);
        index_1.db.set(`account_${importAll_1.getName(user.id)}.currency.wallet`, wal + amount);
        message.channel.send(`Successfully transfered ${amount} to ${user.username}`);
        index_1.db.save();
    },
};
