import { Attributes } from "cmdo-auth";

import { ACCOUNT_FLAGS } from "./Constants";
import { Filters } from "./Types";

export class AccountAttributes extends Attributes<typeof ACCOUNT_FLAGS, Filters> {
  constructor(filters: Filters) {
    super(ACCOUNT_FLAGS, filters);
  }
}
