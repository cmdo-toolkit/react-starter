import { AccessPermission, Query } from "cmdo-auth";

import { AccountAccessAttributes } from "./Attributes";
import type { Permissions } from "./Types";

export const read: Query<never, Permissions["account"]["read"]> = () => {
  return (filter) => new AccessPermission({ granted: true, attributes: new AccountAccessAttributes(filter) });
};
