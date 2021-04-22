"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const isLoggedIn_1 = require("../functions/isLoggedIn");
module.exports = {
    category: "account",
    name: "logout",
    description: "Logout of an account",
    run: (client, message, args) => {
        if (!isLoggedIn_1.isLoggedIn(message.author.id))
            return message.channel.send("You are not logged into any account");
        let data = index_1.db.get(`all_logged_in`);
        let username = data[message.author.id];
        if (!username)
            return message.channel.send("Internal data error");
        username = data[message.author.id].username;
        index_1.db.delete(`all_logged_in.${message.author.id}`);
        message.channel.send("You have been logged out");
        let x = index_1.db.get(`account_${username}`);
        let index = x.loggedIn.indexOf(message.author.id);
        x.loggedIn.splice(index, 1);
        index_1.db.save();
    },
};
