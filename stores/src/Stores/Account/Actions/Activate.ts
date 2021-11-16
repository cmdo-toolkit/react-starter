import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountActivated } from "../Events/AccountActivated";
import { reducer } from "../Reducer";

export const activate = action<Pick<Account, "id">>(async function (data, { streams }) {
  const stream = streams.get(`account-${data.id}`);
  const account = await stream.reduce(reducer);
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.status === "active") {
    throw new Error("Account is already active");
  }
  await stream.save(new AccountActivated(data));
});
