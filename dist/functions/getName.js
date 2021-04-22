"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getName = void 0;
const index_1 = require("../index");
function getName(userID) {
    let output = null;
    let data = index_1.db.get(`all_logged_in.${userID}.username`);
    if (data)
        output = data;
    return output;
}
exports.getName = getName;
