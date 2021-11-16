import { Event } from "cmdo-events";

import { Account } from "../Aggregate";

export class AccountUsernameSet extends Event<Pick<Account, "id" | "username">> {
  public static readonly type = "AccountUsernameSet" as const;
}
