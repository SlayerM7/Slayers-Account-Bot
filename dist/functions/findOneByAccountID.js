"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneByAccountID = void 0;
const __1 = require("..");
const findOne_1 = require("./findOne");
function findOneByAccountID(ID) {
    let response = null;
    let values = __1.db.values();
    values.forEach((value) => {
        if (value.id) {
            if (value.id === ID)
                response = findOne_1.findOne(value.username);
        }
    });
    return response;
}
exports.findOneByAccountID = findOneByAccountID;
