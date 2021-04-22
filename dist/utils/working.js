"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
function check(db) {
    if (db.has("is_working")) {
        let arr = db.get("is_working");
        arr.forEach((name) => {
            let data = db.get(`working.${name}`);
            if (data.hourStarted + 6 == new Date().getHours()) {
                db.splice("is_working", name);
                db.delete(`working.${name}`);
                db.set(`account_${name}.currency.wallet`, 10000);
                db.save();
            }
        });
    }
    else
        return;
}
exports.check = check;
// hourStarted: new Date().getHours(),
// hourEnd: new Date().getHours() + 6,
