import { db } from "../index";
import { isLoggedIn } from "../functions/isLoggedIn";

module.exports = {
  category: "account",
  name: "logout",
  description: "Logout of an account",
  run: (client, message, args) => {
    if (!isLoggedIn(message.author.id))
      return message.channel.send("You are not logged into any account");

    let data = db.get(`all_logged_in`);

    let username = data[message.author.id];

    if (!username) return message.channel.send("Internal data error");

    username = data[message.author.id].username;

    db.delete(`all_logged_in.${message.author.id}`);

    message.channel.send("You have been logged out");

    let x = db.get(`account_${username}`);
    let index = x.loggedIn.indexOf(message.author.id);
    x.loggedIn.splice(index, 1);

    db.save();
  },
};
