import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountCreated } from "../Events/AccountCreated";
import { reducer } from "../Reducer";

export const create = action<Pick<Account, "id" | "email">>(async function (data, { streams }) {
  try {
    const stream = streams.get(`account-${data.id}`);
    const account = await stream.reduce(reducer);
    if (account) {
      throw new Error("Account already exists");
    }
    await stream.save(new AccountCreated(data));
  } catch (error) {
    console.log("Failed to created account", error);
  }
});
