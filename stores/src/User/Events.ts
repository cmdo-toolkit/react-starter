import type { EventBase } from "cmdo-events";

import type { User } from "./Aggregate";

export type UserCreated = EventBase<"UserCreated", Pick<User, "accountId" | "name" | "email">, never>;
export type UserEmailSet = EventBase<"UserEmailSet", Pick<User, "email">, never>;
export type UserNameSet = EventBase<"UserNameSet", Pick<User, "name">, never>;
export type UserRemoved = EventBase<"UserRemoved", never, never>;
