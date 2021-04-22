import { db } from "..";
import { getName } from "../functions/getName";
import { isLoggedIn } from "../functions/isLoggedIn";

module.exports = {
  name: "change-password",
  category: "account",
  usage: "[new password]",
  description: "Change password of an account",
  aliases: ["change-pass", "change_password", "change_pass"],
  dmOnly: true,
  run: (client, message, args) => {
    if (!isLoggedIn(message.author.id)) {
      return message.channel.send("You are not logged into any account");
    }

    let newPassword = args.join(" ");
    if (!newPassword) return message.channel.send("No new password was given");

    db.set(`account_${getName(message.author.id)}.password`, newPassword);

    message.channel.send("Password has been changed.");

    db.save();
  },
};
