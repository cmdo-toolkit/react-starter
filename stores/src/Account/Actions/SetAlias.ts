import { createAction } from "cmdo-events";

import { Account } from "../Aggregate";
import { account } from "../Factories";
import { reducer } from "../Reducer";

export const setAlias = createAction<Pick<Account, "accountId" | "alias">>(async function (
  { accountId, alias },
  { auth, reduce, append }
) {
  const permission = auth.access.get(accountId).can("setAlias", "account");
  if (!permission.granted) {
    throw new Error(permission.message);
  }
  const state = await reduce(accountId, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.alias === alias) {
    throw new Error("Alias already set");
  }
  await append(accountId, account.aliasSet({ data: { alias } }));
});
