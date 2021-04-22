"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const findOne_1 = require("../functions/findOne");
const isLoggedIn_1 = require("../functions/isLoggedIn");
const getName_1 = require("../functions/getName");
const getRandom_1 = require("../functions/getRandom");
module.exports = {
    name: "beg",
    description: "Beg for money",
    category: "economy",
    run: (client, message, args) => {
        if (!isLoggedIn_1.isLoggedIn(message.author.id))
            return message.channel.send("You are not logged into an account\nUse `login` command to login");
        let user = findOne_1.findOne(getName_1.getName(message.author.id));
        let { data } = user;
        if (!data.currency) {
            data.currency = {};
            index_1.db.set(`account_${getName_1.getName(message.author.id)}.currency`, {});
            user = findOne_1.findOne(getName_1.getName(message.author.id));
            data = user.data;
        }
        let wallet = data.currency.wallet || 0;
        let random = Math.floor(Math.random() * 100);
        if (random > 75) {
            return message.reply("Fuck off u cunt");
        }
        else {
            let amount = getRandom_1.getRandom(500, 1000);
            wallet = wallet + amount;
            index_1.db.set(`account_${getName_1.getName(message.author.id)}.currency.wallet`, wallet);
            index_1.db.save();
            message.channel.send(`Added ${amount} to your wallet`);
        }
    },
};
