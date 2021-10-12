import { Event } from "cmdo-events";

import { Account } from "../Aggregate";

export class AccountActivated extends Event<Pick<Account, "id">> {
  public static readonly type = "AccountActivated" as const;
}
