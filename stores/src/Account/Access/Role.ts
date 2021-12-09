import { container, Role } from "cmdo-auth";

import { Permissions } from "./Types";

export class AccountRole extends Role<Permissions> {
  public static async get(roleId: string, db = container.get("Database")) {
    const role = await db.getRole(roleId);
    if (role) {
      return new AccountRole(role as any);
    }
  }
}
