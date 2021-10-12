import { Event } from "cmdo-events";

import { Account } from "../Aggregate";

export class AccountEmailSet extends Event<Pick<Account, "id" | "email">> {
  public static readonly type = "AccountEmailSet" as const;
}
