import { db } from "..";
import { findOnByID } from "./findOneByID";

function checkDB() {
  if (!db.has("all_logged_in")) {
    db.set("all_logged_in", {});
    db.save();
  }
}

export { checkDB };
