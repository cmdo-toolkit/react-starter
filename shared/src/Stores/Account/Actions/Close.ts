import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountClosed } from "../Events/AccountClosed";
import { reducer } from "../Reducer";

export const close = action<Pick<Account, "id">>(async function (data, { store }) {
  const account = await store.reduce(reducer, { "event.data.id": data.id });
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.status === "closed") {
    throw new Error("Account is already closed");
  }
  await store.save(data.id, new AccountClosed(data));
});
