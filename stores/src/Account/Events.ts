import { EventRecord } from "cmdo-events";

import type { Account } from "./Aggregate";

export type AccountCreated = EventRecord<"AccountCreated", Pick<Account, "email">>;
export type AccountActivated = EventRecord<"AccountActivated">;
export type AccountUsernameSet = EventRecord<"AccountUsernameSet", Pick<Account, "username">>;
export type AccountEmailSet = EventRecord<"AccountEmailSet", Pick<Account, "email">>;
export type AccountClosed = EventRecord<"AccountClosed">;
