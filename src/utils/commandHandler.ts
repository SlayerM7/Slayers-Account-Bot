import { run } from "../models/interfaces/run";
import { db, commands, aliases, client } from "..";

let prefixToExport = process.env.PREFIX;
let config = require("../../config.json");

let commandHandler = (message) => {
  let prefix = process.env.PREFIX;
  let { author, content } = message;

  if (db.has(`prefixes_${message.guild ? message.guild.id : "x"}`)) {
    let x = db.get(`prefixes_${message.guild.id}`);
    prefix = x;
  }

  prefixToExport = prefix;

  if (author.bot) return;
  if (!content.startsWith(prefix)) return;

  let args = content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();
  if (commands.has(command) || commands.has(aliases.get(command))) {
    let cmd =
      <run>commands.get(command) || <run>commands.get(aliases.get(command));
    if (cmd) {
      if (
        config.blacklists.includes(message.author.id) &&
        cmd.allowEveryone !== true
      )
        return message.reply("You are a blacklisted user from this bot. ");
      let requiredPerms = [];
      if (cmd.permissions) {
        cmd.permissions.forEach((permission) => {
          requiredPerms.push(`\`${permission}\``);
        });
      }

      if (requiredPerms.length) {
        return message.channel.send(
          `You need ${requiredPerms.join(", ")} permission`
        );
      }

      if (cmd.guildOnly && !message.guild)
        return message.channel.send(
          "This command can only be used in a server"
        );
      if (cmd.dmOnly && message.channel.type !== "dm")
        return message.reply(
          "This command can only be used in DM's as it requires you to input a password that should be kept private"
        );
      cmd.run(client, message, args, db);
    }
  }
};

export { commandHandler };
