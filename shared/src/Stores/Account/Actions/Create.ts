import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountCreated } from "../Events/AccountCreated";
import { reducer } from "../Reducer";

export const create = action<Pick<Account, "id" | "email">>(async function (data, { store }) {
  const account = await store.reduce(reducer, { "event.data.id": data.id });
  if (account) {
    throw new Error("Account already exists");
  }
  await store.save(data.id, new AccountCreated(data));
});
