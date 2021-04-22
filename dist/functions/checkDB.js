"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDB = void 0;
const __1 = require("..");
function checkDB() {
    if (!__1.db.has("all_logged_in")) {
        __1.db.set("all_logged_in", {});
        __1.db.save();
    }
}
exports.checkDB = checkDB;
