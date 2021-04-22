import { db } from "../index";

function getName(userID) {
  let output = null;
  let data = db.get(`all_logged_in.${userID}.username`);

  if (data) output = data;

  return output;
}

export { getName };
