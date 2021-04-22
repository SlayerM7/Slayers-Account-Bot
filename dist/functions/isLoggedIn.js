"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const index_1 = require("../index");
function isLoggedIn(userID) {
    let output = false;
    if (index_1.db.has(`all_logged_in.${userID}`)) {
        output = true;
    }
    return output;
}
exports.isLoggedIn = isLoggedIn;
