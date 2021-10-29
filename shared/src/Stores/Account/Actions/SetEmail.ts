import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountEmailSet } from "../Events/AccountEmailSet";
import { reducer } from "../Reducer";

export const setEmail = action<Pick<Account, "id" | "email">>(async function (data, { store }) {
  const account = await store.reduce(reducer, { "event.data.id": data.id });
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.email === data.email) {
    throw new Error("Email already set");
  }
  await store.save(data.id, new AccountEmailSet(data));
});
