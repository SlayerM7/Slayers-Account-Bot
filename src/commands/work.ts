import { getName } from "../functions/getName";
import { jobs } from "../models/jobs";
import { shop } from "../models/shop";
import ms from "ms";

module.exports = {
  name: "work",
  usage: "[job]",
  category: "economy",
  run: (client, message, args, db) => {
    let job = args[0];
    if (!job) return message.channel.send("No job was given");
    if (!jobs.includes(job))
      return message.channel.send("That job does not exist");

    let shopCheck;

    shop.forEach((xxx) => {
      if (xxx.worksRequired.includes(job)) shopCheck = xxx;
    });

    let stop = null;

    if (shopCheck) {
      if (!db.has(`items_${shopCheck.item}.${getName(message.author.id)}`))
        stop = true;
    }

    if (stop === true)
      return message.channel.send("You do not have the needed items.");

    db.set(`working.${getName(message.author.id)}`, {
      hourStarted: new Date().getHours(),
      hourEnd: new Date().getHours() + 6,
    });

    if (!db.has("is_working")) {
      db.set("is_working", [getName(message.author.id)]);
    } else {
      db.push("is_working", getName(message.author.id));
    }

    message.reply("You are now working");

    db.save();
  },
};
