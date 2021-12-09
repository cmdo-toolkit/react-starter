import { Access, container } from "cmdo-auth";

import { Permissions } from "./Types";

class AccountAccess extends Access<Permissions> {}

export async function get(accountId: string, db = container.get("Database")) {
  return new AccountAccess(await db.getPermissions(accountId, accountId));
}
