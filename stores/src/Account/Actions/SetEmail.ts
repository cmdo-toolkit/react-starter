import { createAction } from "cmdo-events";

import { Account } from "../Aggregate";
import { account } from "../Factories";
import { reducer } from "../Reducer";

export const setEmail = createAction<Pick<Account, "accountId" | "email">>(async function (
  { accountId, email },
  { auth, reduce, append }
) {
  const permission = auth.access.get(accountId).can("setEmail", "account");
  if (!permission.granted) {
    throw new Error(permission.message);
  }
  const state = await reduce(accountId, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.email === email) {
    throw new Error("Email already set");
  }
  await append(accountId, account.emailSet({ data: { email } }));
});
