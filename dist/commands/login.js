"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
module.exports = {
    name: "login",
    category: "account",
    dmOnly: true,
    description: "Login to an account",
    run: (client, message, args) => {
        if (index_1.db.has(`all_logged_in.${message.author.id}`)) {
            let x = index_1.db.get(`all_logged_in.${message.author.id}`);
            return message.channel.send(`You are already logged in as: ${x.username}\nUse the \`logout\` command`);
        }
        let filter = (m) => {
            return m.author.id === message.author.id;
        };
        message.channel.send("Enter your username:");
        let collector = new discord_js_1.MessageCollector(message.channel, filter, {
            time: 50 * 1000,
            max: 2,
        });
        let c = 0;
        collector.on("collect", (msg) => {
            c++;
            if (c === 2) {
                collector.stop();
                return;
            }
            message.channel.send("Enter password: ");
        });
        collector.on("end", (collected) => {
            let counter = 0;
            let username = null;
            let password = null;
            collected.forEach((value) => {
                if (counter == 0) {
                    username = value.content;
                }
                if (counter === 1)
                    password = value.content;
                counter++;
            });
            if (!index_1.db.has(`account_${username}`))
                return message.channel.send("That account does not exist");
            let data = index_1.db.get(`account_${username}`);
            if (password !== data.password)
                return message.channel.send("That is not the password");
            data.loggedIn.push(message.author.id);
            index_1.db.set(`all_logged_in.${message.author.id}`, {
                username: username,
            });
            index_1.db.save();
            message.reply(`Welcome back ${username}`);
        });
    },
};
