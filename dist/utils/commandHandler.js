"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandHandler = void 0;
const __1 = require("..");
let prefixToExport = process.env.PREFIX;
let config = require("../../config.json");
let commandHandler = (message) => {
    var _a;
    let prefix = process.env.PREFIX;
    let { author, content } = message;
    if (__1.db.has(`prefixes_${message.guild ? message.guild.id : "x"}`)) {
        let x = __1.db.get(`prefixes_${message.guild.id}`);
        prefix = x;
    }
    prefixToExport = prefix;
    if (author.bot)
        return;
    if (!content.startsWith(prefix))
        return;
    let args = content.slice(prefix.length).trim().split(/ +/);
    const command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (__1.commands.has(command) || __1.commands.has(__1.aliases.get(command))) {
        let cmd = __1.commands.get(command) || __1.commands.get(__1.aliases.get(command));
        if (cmd) {
            if (config.blacklists.includes(message.author.id) &&
                cmd.allowEveryone !== true)
                return message.reply("You are a blacklisted user from this bot. ");
            let requiredPerms = [];
            if (cmd.permissions) {
                cmd.permissions.forEach((permission) => {
                    requiredPerms.push(`\`${permission}\``);
                });
            }
            if (requiredPerms.length) {
                return message.channel.send(`You need ${requiredPerms.join(", ")} permission`);
            }
            if (cmd.guildOnly && !message.guild)
                return message.channel.send("This command can only be used in a server");
            if (cmd.dmOnly && message.channel.type !== "dm")
                return message.reply("This command can only be used in DM's as it requires you to input a password that should be kept private");
            cmd.run(__1.client, message, args, __1.db);
        }
    }
};
exports.commandHandler = commandHandler;
