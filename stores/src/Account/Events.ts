import type { EventBase } from "cmdo-events";

import type { Account } from "./Aggregate";

export type AccountCreated = EventBase<"AccountCreated", Pick<Account, "email">, never>;
export type AccountActivated = EventBase<"AccountActivated", never, never>;
export type AccountEmailSet = EventBase<"AccountEmailSet", Pick<Account, "email">, never>;
export type AccountClosed = EventBase<"AccountClosed", never, never>;
