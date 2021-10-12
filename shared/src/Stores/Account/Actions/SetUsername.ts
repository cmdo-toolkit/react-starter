import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountUsernameSet } from "../Events/AccountUsernameSet";

export const setUsername = action<Pick<Account, "id" | "username">>(async function (data, { store }) {
  await store.save(data.id, new AccountUsernameSet(data));
});
