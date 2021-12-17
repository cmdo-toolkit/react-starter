import { Action } from "cmdo-socket";
import * as jwt from "jsonwebtoken";
import { stores } from "stores";

import { config } from "../../../Config";
import { Account } from "../Account";

export const validateToken: Action<{ email: string; token: string }> = async function (_, { token, email }) {
  const account = await Account.getByEmail(email);

  if (!account) {
    return this.reject("Token is invalid or has expired");
  }

  if (!account.token.validate(token)) {
    return this.reject("Token is invalid or has expired");
  }

  if (account.is("onboarding")) {
    await stores.account.activate({ accountId: account.accountId });
  }

  await account.token.delete();

  return this.respond({ token: jwt.sign({ auditor: account.accountId }, config.auth.secret) });
};
