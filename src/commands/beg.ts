import { db } from "../index";
import { findOne } from "../functions/findOne";
import { isLoggedIn } from "../functions/isLoggedIn";
import { getName } from "../functions/getName";
import { getRandom } from "../functions/getRandom";

module.exports = {
  name: "beg",
  description: "Beg for money",
  category: "economy",
  run: (client, message, args) => {
    if (!isLoggedIn(message.author.id))
      return message.channel.send(
        "You are not logged into an account\nUse `login` command to login"
      );

    let user = findOne(getName(message.author.id));

    let { data } = user;

    if (!data.currency) {
      data.currency = {};
      db.set(`account_${getName(message.author.id)}.currency`, {});
      user = findOne(getName(message.author.id));
      data = user.data;
    }

    let wallet = data.currency.wallet || 0;

    let random = Math.floor(Math.random() * 100);

    if (random > 75) {
      return message.reply("Fuck off u cunt");
    } else {
      let amount = getRandom(500, 1000);
      wallet = wallet + amount;
      db.set(`account_${getName(message.author.id)}.currency.wallet`, wallet);
      db.save();
      message.channel.send(`Added ${amount} to your wallet`);
    }
  },
};
