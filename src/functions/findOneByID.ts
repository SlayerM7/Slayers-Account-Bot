import { findOne, getName } from "./importAll";

function findOnByID(ID) {
  return findOne(getName(ID)) || null;
}

export { findOnByID };
