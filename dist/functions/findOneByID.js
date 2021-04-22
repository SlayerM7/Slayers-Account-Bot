"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOnByID = void 0;
const importAll_1 = require("./importAll");
function findOnByID(ID) {
    return importAll_1.findOne(importAll_1.getName(ID)) || null;
}
exports.findOnByID = findOnByID;
