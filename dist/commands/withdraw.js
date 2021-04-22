"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const importAll_1 = require("../functions/importAll");
module.exports = {
    category: "economy",
    description: "Withdraw money from bank",
    name: "withdraw",
    usage: "[amount]",
    aliases: ["with"],
    /**
     *
     * @param {Client}client
     * @param {Message}message
     * @param {String[]}args
     */
    run: (client, message, args) => {
        if (!importAll_1.isLoggedIn(message.author.id)) {
            return message.channel.send("You are not logged into any account");
        }
        let { data } = importAll_1.findOne(importAll_1.getName(message.author.id));
        if (!data.currency)
            return message.channel.send("You have nothing in your bank");
        let amt = args[0];
        if (!amt)
            return message.channel.send("No amount was given");
        let wallet = data.currency.wallet || 0;
        let bank = data.currency.bank || 0;
        if (amt === "all")
            amt = bank;
        if (amt === "half")
            amt = bank * 0.5;
        if (amt === "quarter")
            amt = bank * 0.25;
        if (amt === "10%")
            amt = bank * 0.1;
        if (amt !== "all" && amt !== "half" && amt !== "quarter" && amt !== "10%") {
            amt = Number(amt);
            if (!amt)
                return message.channel.send("Amount must be a Number");
        }
        index_1.db.set(`account_${importAll_1.getName(message.author.id)}.currency.wallet`, wallet + amt);
        index_1.db.set(`account_${importAll_1.getName(message.author.id)}.currency.bank`, bank - amt);
        message.channel.send("Successfully withdrawed " + amt);
        index_1.db.save();
    },
};
