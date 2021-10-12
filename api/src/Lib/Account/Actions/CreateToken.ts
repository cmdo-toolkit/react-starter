import { Action } from "cmdo-socket";

import { Account } from "../Account";

export const createToken: Action<{ email: string }> = async function (socket, { email }) {
  try {
    const account = await Account.getByEmailOrCreate(email);
    await account.token.create("console");
    return this.respond();
  } catch (error) {
    return this.reject(error.message);
  }
};
