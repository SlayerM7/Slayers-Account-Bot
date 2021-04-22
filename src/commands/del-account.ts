import { db } from "..";
import { findOne } from "../functions/findOne";

module.exports = {
  name: "delete-account",
  category: "economy",
  usage: "[account name]",
  description: "Delete an account",
  aliases: ["del-account", "delete-acc", "del-acc"],
  run: (client, message, args) => {
    let username = args.join(" ");
    if (!username)
      return message.channel.send("No username or account ID was given");

    let data = findOne(username);
    if (Number(username)) {
      data = findOne(Number(username));
    } else {
      if (!data) return message.channel.send("That account does not exist");

      data = data.data;

      if (data.ownerID !== message.author.id)
        return message.channel.send(
          "Only the account creator can delete the account"
        );

      db.delete(`account_${username}`);
      db.delete(`all_logged_in.${message.author.id}`);
      db.save();

      message.reply("The account has been deleted");
    }
  },
};
