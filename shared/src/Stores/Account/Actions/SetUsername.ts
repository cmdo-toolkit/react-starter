import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountUsernameSet } from "../Events/AccountUsernameSet";
import { reducer } from "../Reducer";

export const setUsername = action<Pick<Account, "id" | "username">>(async function (data, { streams }) {
  const stream = streams.get(`account-${data.id}`);
  const account = await stream.reduce(reducer);
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.username === data.username) {
    throw new Error("Username already set");
  }
  await stream.save(new AccountUsernameSet(data));
});
