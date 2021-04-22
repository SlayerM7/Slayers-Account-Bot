"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWallet = void 0;
const findOne_1 = require("./findOne");
function getWallet(user) {
    let output = null;
    if (!user)
        throw new SyntaxError("No user was given in getWallet function");
    let acc = findOne_1.findOne(user);
    if (acc) {
        output = acc.data.currency.wallet;
    }
    return output;
}
exports.getWallet = getWallet;
