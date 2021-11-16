import { Event } from "cmdo-events";

import { Account } from "../Aggregate";

export class AccountClosed extends Event<Pick<Account, "id">> {
  public static readonly type = "AccountClosed" as const;
}
