import { db } from "../index";

function findOne(accountName) {
  let output = null;
  if (db.has(`account_${accountName}`)) {
    let data = db.get(`account_${accountName}`);
    output = {
      username: accountName,
      password: data.password,
      data,
    };
  }
  return output;
}

export { findOne };
