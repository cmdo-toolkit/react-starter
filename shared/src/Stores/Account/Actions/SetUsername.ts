import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountUsernameSet } from "../Events/AccountUsernameSet";
import { reducer } from "../Reducer";

export const setUsername = action<Pick<Account, "id" | "username">>(async function (data, { store }) {
  const account = await store.reduce(reducer, { "event.data.id": data.id });
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.username === data.username) {
    throw new Error("Username already set");
  }
  await store.save(data.id, new AccountUsernameSet(data));
});
