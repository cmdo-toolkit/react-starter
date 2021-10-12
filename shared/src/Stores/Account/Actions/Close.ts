import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountClosed } from "../Events/AccountClosed";

export const close = action<Pick<Account, "id">>(async function (data, { store }) {
  await store.save(data.id, new AccountClosed(data));
});
