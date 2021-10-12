import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountCreated } from "../Events/AccountCreated";

export const create = action<Pick<Account, "id" | "email">>(async function (data, { store }) {
  const account = new AccountCreated(data);
  await store.save(account.data.id, account);
});
