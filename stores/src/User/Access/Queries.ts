import { AccessPermission, Query } from "cmdo-auth";

import { UserAccessAttributes } from "./Attributes";
import type { Permissions } from "./Types";

export const read: Query<never, Permissions["user"]["read"]> = () => {
  return (filter) => new AccessPermission({ granted: true, attributes: new UserAccessAttributes(filter) });
};
