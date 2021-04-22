"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getName_1 = require("../functions/getName");
const getWallet_1 = require("../functions/getWallet");
const isLoggedIn_1 = require("../functions/isLoggedIn");
const shop_1 = require("../models/shop");
module.exports = {
    name: "buy",
    description: "Buy an item",
    category: "economy",
    run: (client, message, args, db) => {
        if (!isLoggedIn_1.isLoggedIn(message.author.id))
            return message.channel.send("You are not logged into any account");
        let items = [];
        shop_1.shop.forEach((itemObject) => {
            items.push(itemObject.item);
        });
        let item = args[0];
        if (!item)
            return message.channel.send("No item name was given");
        let wallet = getWallet_1.getWallet(getName_1.getName(message.author.id));
        if (!items.includes(item))
            return message.channel.send("That item does not exist.. Use !shop to see all items");
        if (!wallet)
            return message.channel.send("You have nothing in your wallet");
        const index = items.indexOf(item);
        let itemData;
        shop_1.shop.forEach((ob) => {
            if (ob.item === item)
                itemData = ob;
        });
        if (!itemData)
            return message.channel.send("Failed to find data in shop");
        if (itemData.price > wallet)
            return message.channel.send(`The item costs **${itemData.price}** but you only have **${wallet}** in your wallet`);
        db.set(`items_${item}.${getName_1.getName(message.author.id)}`, {
            date: new Date(),
            func: true,
            item: item,
            authorID: message.author.id,
            accountName: getName_1.getName(message.author.id),
        });
        if (!db.has(`account_${getName_1.getName(message.author.id)}.currency`))
            db.set(`account_${getName_1.getName(message.author.id)}.currency`, {});
        db.set(`account_${getName_1.getName(message.author.id)}.currency.wallet`, wallet - itemData.price);
        db.save();
        message.channel.send(`You have succesfully bought a **${item}**`);
    },
};
