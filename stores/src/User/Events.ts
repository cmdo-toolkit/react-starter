import type { EventBase } from "cmdo-events";

import type { User } from "./Aggregate";

export type UserCreated = EventBase<"UserCreated", Pick<User, "id" | "name" | "email">, never>;
export type UserEmailSet = EventBase<"UserEmailSet", Pick<User, "id" | "email">, never>;
export type UserNameSet = EventBase<"UserNameSet", Pick<User, "id" | "name">, never>;
export type UserRemoved = EventBase<"UserRemoved", Pick<User, "id">, never>;
