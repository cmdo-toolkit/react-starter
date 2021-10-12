import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountEmailSet } from "../Events/AccountEmailSet";

export const setEmail = action<Pick<Account, "id" | "email">>(async function (data, { store }) {
  await store.save(data.id, new AccountEmailSet(data));
});
