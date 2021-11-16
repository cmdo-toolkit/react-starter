import { Event } from "cmdo-events";

import { Account } from "../Aggregate";

export class AccountCreated extends Event<Pick<Account, "id" | "email">> {
  public static readonly type = "AccountCreated" as const;
  public static readonly genesis = true;
}
