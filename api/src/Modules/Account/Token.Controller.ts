import { Action } from "cmdo-socket";
import * as jwt from "jsonwebtoken";
import { stores } from "stores";

import { config } from "../../Config";
import * as accountService from "./Account.Service";
import * as tokenService from "./Token.Service";

/*
 |--------------------------------------------------------------------------------
 | Create
 |--------------------------------------------------------------------------------
 */

export const create: Action<{ email: string }> = async function (_, { email }) {
  try {
    const account = await accountService.getByEmailOrCreate(email);
    if (!account) {
      return this.reject("Failed to retrieve account id");
    }
    await tokenService.create("console", account.accountId);
    return this.respond();
  } catch (error) {
    return this.reject(error.message);
  }
};

/*
 |--------------------------------------------------------------------------------
 | Validate
 |--------------------------------------------------------------------------------
 */

export const validate: Action<{ email: string; token: string }> = async function (_, { token, email }) {
  const account = await accountService.getByEmail(email);

  if (!account) {
    return this.reject("Token is invalid or has expired");
  }

  if (account.token !== token) {
    return this.reject("Token is invalid or has expired");
  }

  if (account.status === "onboarding") {
    await stores.account.activate({ accountId: account.accountId });
  }

  await tokenService.remove(account.accountId);

  return this.respond({ token: jwt.sign({ auditor: account.accountId }, config.auth.secret) });
};
