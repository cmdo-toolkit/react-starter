import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountClosed } from "../Events/AccountClosed";
import { reducer } from "../Reducer";

export const close = action<Pick<Account, "id">>(async function (data, { streams }) {
  const stream = streams.get(`account-${data.id}`);
  const account = await stream.reduce(reducer);
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.status === "closed") {
    throw new Error("Account is already closed");
  }
  await stream.save(new AccountClosed(data));
});
