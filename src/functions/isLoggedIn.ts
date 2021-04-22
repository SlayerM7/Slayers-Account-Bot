import { db } from "../index";

function isLoggedIn(userID) {
  let output = false;
  if (db.has(`all_logged_in.${userID}`)) {
    output = true;
  }
  return output;
}
export { isLoggedIn };
