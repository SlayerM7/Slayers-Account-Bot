"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = void 0;
const index_1 = require("../index");
function findOne(accountName) {
    let output = null;
    if (index_1.db.has(`account_${accountName}`)) {
        let data = index_1.db.get(`account_${accountName}`);
        output = {
            username: accountName,
            password: data.password,
            data,
        };
    }
    return output;
}
exports.findOne = findOne;
