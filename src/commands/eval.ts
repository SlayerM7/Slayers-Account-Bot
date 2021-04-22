import { MessageEmbed } from "discord.js";

require("dotenv").config();

module.exports = {
  name: "eval",
  description: "Evaluate code - Owner only",
  category: "owner",
  async run(client, message, args) {
    let msg = message;
    let { author, guild, member } = message;
    if (message.author.id !== process.env.OWNER_ID)
      return message.channel.send("Only the bot owner can use this command");
    let code = args.join(" ");
    if (!code) return message.channel.send("No code was given");
    try {
      let x = eval(code);

      const embed = new MessageEmbed()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor("RED")
        .setDescription(`\`\`\`js\n${x}\n\`\`\``);

      message.channel.send(embed);
    } catch (e) {
      message.channel.send("Failed to evaluate\n\nError: " + `\`${e}\``);
    }
  },
};
