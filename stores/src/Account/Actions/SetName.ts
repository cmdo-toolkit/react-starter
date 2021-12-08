import { createAction } from "cmdo-events";

import { Account } from "../Aggregate";
import { account } from "../Factories";
import { reducer } from "../Reducer";

export const setName = createAction<Pick<Account, "accountId" | "name">>(async function (
  { accountId, name },
  { auth, reduce, append }
) {
  const permission = auth.access.get(accountId).can("setName", "account");
  if (!permission.granted) {
    throw new Error(permission.message);
  }
  const state = await reduce(accountId, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.name === name) {
    throw new Error("Name already set");
  }
  await append(accountId, account.nameSet({ data: { name } }));
});
