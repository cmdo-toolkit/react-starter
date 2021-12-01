import type { EventBase } from "cmdo-events";

import type { Account } from "./Aggregate";

export type AccountCreated = EventBase<"AccountCreated", Pick<Account, "id" | "email">, never>;
export type AccountActivated = EventBase<"AccountActivated", Pick<Account, "id">, never>;
export type AccountUsernameSet = EventBase<"AccountUsernameSet", Pick<Account, "id" | "username">, never>;
export type AccountEmailSet = EventBase<"AccountEmailSet", Pick<Account, "id" | "email">, never>;
export type AccountClosed = EventBase<"AccountClosed", Pick<Account, "id">, never>;
