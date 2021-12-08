import { createAction } from "cmdo-events";

import { Account } from "../Aggregate";
import { account } from "../Factories";
import { reducer } from "../Reducer";

export const close = createAction<Pick<Account, "accountId">>(async function ({ accountId }, { reduce, append }) {
  const state = await reduce(accountId, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.status === "closed") {
    throw new Error("Account is already closed");
  }
  await append(accountId, account.closed({}));
});
