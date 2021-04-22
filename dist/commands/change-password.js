"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const getName_1 = require("../functions/getName");
const isLoggedIn_1 = require("../functions/isLoggedIn");
module.exports = {
    name: "change-password",
    category: "account",
    usage: "[new password]",
    description: "Change password of an account",
    aliases: ["change-pass", "change_password", "change_pass"],
    dmOnly: true,
    run: (client, message, args) => {
        if (!isLoggedIn_1.isLoggedIn(message.author.id)) {
            return message.channel.send("You are not logged into any account");
        }
        let newPassword = args.join(" ");
        if (!newPassword)
            return message.channel.send("No new password was given");
        __1.db.set(`account_${getName_1.getName(message.author.id)}.password`, newPassword);
        message.channel.send("Password has been changed.");
        __1.db.save();
    },
};
