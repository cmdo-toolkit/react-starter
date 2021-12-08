import { createAction } from "cmdo-events";

import { Account } from "../Aggregate";
import { account } from "../Factories";
import { reducer } from "../Reducer";

export const create = createAction<Pick<Account, "accountId" | "email">>(async function ({ accountId, email }, { reduce, append }) {
  try {
    const state = await reduce(accountId, reducer);
    if (state) {
      throw new Error("Account already exists");
    }
    await append(accountId, account.created({ data: { email } }));
  } catch (error) {
    console.log("Failed to created account", error);
  }
});
