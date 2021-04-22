import { getRandom } from "../functions/getRandom";
const { MessageCollector } = require("discord.js");
module.exports = {
  name: "register",
  category: "account",
  dmOnly: true,
  description: "Create an account",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: (client, message, args, db) => {
    let questions = ["Enter username:", "Enter password:"];

    let filter = (m) => {
      return m.author.id === message.author.id;
    };
    let count = 0;
    message.channel.send(questions[count]);
    count++;
    let collector = new MessageCollector(message.channel, filter, {
      max: 2,
      time: 60 * 1000,
    });

    collector.on("collect", (msg) => {
      message.channel.send(questions[count]).catch(() => {});
      count++;
      if (count === questions.length + 1) {
        collector.stop("done");
      }
    });
    collector.on("end", (collected, reason) => {
      let counter = 0;
      let username = null;
      let password = null;
      collected.forEach((value) => {
        if (questions[counter] === "Enter username:") username = value.content;
        if (questions[counter] === "Enter password:") password = value.content;
        counter++;
      });

      if (username !== null) {
        if (db.has(`account_${username}`)) {
          return message
            .reply("That username is already taken")
            .catch(() => {});
        } else {
          db.set(`account_${username}`, {
            password: password,
            username: username,
            id: getRandom(40000000000000, 90000000000000),
            createdAt: new Date(),
            ownerID: message.author.id,
            owner: message.author,
            loggedIn: [],
          });
          db.save();
          message.channel.send(
            `Registered your account! You can log in now by using the \`login\` command`
          );
        }
      }
    });
  },
};
