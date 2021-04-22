"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = void 0;
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.getRandom = getRandom;
