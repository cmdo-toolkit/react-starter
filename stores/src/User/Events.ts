import { EventRecord } from "cmdo-events";

import { User } from "./Aggregate";

export type UserCreated = EventRecord<"UserCreated", Pick<User, "name" | "email">>;
export type UserEmailSet = EventRecord<"UserEmailSet", Pick<User, "email">>;
export type UserNameSet = EventRecord<"UserNameSet", Pick<User, "name">>;
export type UserRemoved = EventRecord<"UserRemoved">;
