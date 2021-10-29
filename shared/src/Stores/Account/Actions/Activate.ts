import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountActivated } from "../Events/AccountActivated";
import { reducer } from "../Reducer";

export const activate = action<Pick<Account, "id">>(async function (data, { store }) {
  const account = await store.reduce(reducer, { "event.data.id": data.id });
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.status === "active") {
    throw new Error("Account is already active");
  }
  await store.save(data.id, new AccountActivated(data));
});
