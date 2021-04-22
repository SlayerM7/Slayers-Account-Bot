import { findOne } from "./findOne";

function getWallet(user) {
  let output = null;
  if (!user) throw new SyntaxError("No user was given in getWallet function");
  let acc = findOne(user);
  if (acc) {
    output = acc.data.currency.wallet;
  }

  return output;
}

export { getWallet };
