import { AccessAttributes } from "cmdo-auth";

import { ACCOUNT_FLAGS } from "./Constants";
import { Filters } from "./Types";

export class AccountAccessAttributes extends AccessAttributes<typeof ACCOUNT_FLAGS, Filters> {
  constructor(filters: Filters) {
    super(ACCOUNT_FLAGS, filters);
  }
}
