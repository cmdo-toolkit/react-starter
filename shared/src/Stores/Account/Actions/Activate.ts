import { action } from "cmdo-events";

import { Account } from "../Aggregate";
import { AccountActivated } from "../Events/AccountActivated";

export const activate = action<Pick<Account, "id">>(async function (data, { store }) {
  await store.save(data.id, new AccountActivated(data));
});
