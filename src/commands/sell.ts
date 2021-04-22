import { getName } from "../functions/getName";
import { getWallet } from "../functions/getWallet";
import { shop } from "../models/shop";

module.exports = {
  name: "sell",
  category: "economy",
  usage: "[item]",
  run(client, message, args, db) {
    let item = args[0];
    if (!item) return message.channel.send("No item name was given");

    let uDontOwn = "You do not own this item";

    if (!db.has(`items_${item}`)) return message.channel.send(uDontOwn);

    if (!db.has(`items_${item}.${getName(message.author.id)}`))
      return message.channel.send(uDontOwn);

    let itemObj;

    shop.forEach((x) => {
      if (x.item === item) itemObj = x;
    });

    let curWllt = getWallet(getName(message.author.id));

    if (!db.has(`account_${getName(message.author.id)}.currency`)) {
      db.set(`account_${getName(message.author.id)}.currency`, {});
    }
    console.log(curWllt);
    console.log(curWllt + itemObj.price);
    db.set(
      `account_${getName(message.author.id)}.currency.wallet`,
      (curWllt || 0) + itemObj.price
    );

    db.delete(`items_${item}.${getName(message.author.id)}`);

    console.log(curWllt);
    message.channel.send(`You have sold **${item}** for **${itemObj.price}**`);
    db.save();
  },
};
