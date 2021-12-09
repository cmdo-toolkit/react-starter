import { createAction } from "cmdo-events";

import { get } from "../Access";
import { Account } from "../Aggregate";
import { account } from "../Factories";
import { reducer } from "../Reducer";

export const close = createAction<Pick<Account, "accountId">>(async function ({ accountId }, { reduce, append }) {
  const permission = await get(accountId).then((access) => access.can("close", "account"));
  if (!permission.granted) {
    throw new Error(permission.message);
  }
  const state = await reduce(accountId, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.status === "closed") {
    throw new Error("Account is already closed");
  }
  await append(accountId, account.closed({}));
});
