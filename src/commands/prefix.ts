import { db, prefixToExport } from "../index";

module.exports = {
  name: "prefix",
  category: "config",
  description: "Change prefix of the server",
  usage: "[new prefix]",
  guildOnly: true,
  run: (client, message, args) => {
    let p = args.join(" ");
    if (!p)
      return message.channel.send(`Current prefix is: \`${prefixToExport}\``);
    db.set(`prefixes_${message.guild.id}`, p);
    message.channel.send(`Prefix set to: \`${p}\``);
    db.save();
  },
};
