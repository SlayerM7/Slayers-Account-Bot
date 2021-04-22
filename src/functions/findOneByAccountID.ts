import { db } from "..";
import { findOne } from "./findOne";

function findOneByAccountID(ID) {
  let response = null;
  let values = db.values();
  values.forEach((value) => {
    if (value.id) {
      if (value.id === ID) response = findOne(value.username);
    }
  });
  return response;
}

export { findOneByAccountID };
