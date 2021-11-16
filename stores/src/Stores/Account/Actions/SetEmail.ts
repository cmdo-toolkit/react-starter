import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountEmailSet } from "../Events/AccountEmailSet";
import { reducer } from "../Reducer";

export const setEmail = action<Pick<Account, "id" | "email">>(async function (data, { streams }) {
  const stream = streams.get(`account-${data.id}`);
  const account = await stream.reduce(reducer);
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.email === data.email) {
    throw new Error("Email already set");
  }
  await stream.save(new AccountEmailSet(data));
});
