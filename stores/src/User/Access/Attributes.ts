import { AccessAttributes } from "cmdo-auth";

import { USER_FLAGS } from "./Constants";
import type { Filters, Flags } from "./Types";

export class UserAccessAttributes extends AccessAttributes<Flags, Filters> {
  constructor(filters: Filters) {
    super(USER_FLAGS, filters);
  }
}
