import axios from "axios";

module.exports = {
  category: "fun",
  description: "Tweet something",
  name: "tweet",
  usage: "[message]",
  guildOnly: true,
  run: async (client, message, args) => {
    if (!args.join(" "))
      return message.channel.send("No message was given to tweet");
    let msg = await message.channel.send("Generating...");
    axios
      .get(
        `https://nekobot.xyz/api/imagegen?type=tweet&username=${
          message.author.username
        }&text=${args.join(" ")}`
      )
      .then(({ data }) => {
        if (data.success !== true) {
          msg.edit("Failed to generate image");
        } else {
          msg.edit(data.message);
        }
      })
      .catch(() => {
        msg.edit("Failed to generate image");
      });
  },
};
