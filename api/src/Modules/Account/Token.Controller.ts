import { WsAction } from "cmdo-server";
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

export const create: WsAction<{ email: string }> = async function (_, { email }) {
  try {
    const account = await accountService.getByEmailOrCreate(email);
    if (!account) {
      return this.reject(400, "Failed to retrieve account id");
    }
    await tokenService.create("console", account.accountId);
    return this.resolve();
  } catch (error) {
    return this.reject(500, error.message);
  }
};

/*
 |--------------------------------------------------------------------------------
 | Validate
 |--------------------------------------------------------------------------------
 */

export const validate: WsAction<{ email: string; token: string }> = async function (_, { token, email }) {
  const account = await accountService.getByEmail(email);

  if (!account) {
    return this.reject(400, "Token is invalid or has expired");
  }

  if (account.token !== token) {
    return this.reject(400, "Token is invalid or has expired");
  }

  if (account.status === "onboarding") {
    await stores.account.activate({ accountId: account.accountId });
  }

  await tokenService.remove(account.accountId);

  return this.resolve({ token: jwt.sign({ auditor: account.accountId }, config.auth.secret) });
};
