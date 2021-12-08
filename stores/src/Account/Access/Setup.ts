import { AccessControl, createAllFilter } from "cmdo-auth";

import { ACCOUNT_FLAGS } from "./Constants";

export async function setup(accountId: string): Promise<void> {
  await AccessControl.for(accountId).then((access) =>
    access
      .grants(accountId)
      .grant("account", "setEmail")
      .grant("account", "read", {
        owner: createAllFilter(ACCOUNT_FLAGS),
        admin: ACCOUNT_FLAGS.accountId | ACCOUNT_FLAGS.status | ACCOUNT_FLAGS.email
      })
      .grant("user", "create")
      .commit()
  );
}
