import { snipes } from "../models/snipes";

module.exports = (client, message) => {
  if (!message.guild) return;
  snipes.set(message.channel.id, {
    author: message.author,
    content: message.content,
    authorID: message.author.id,
    url: message.author.displayAvatarURL({ dynamic: true }),
  });
};
