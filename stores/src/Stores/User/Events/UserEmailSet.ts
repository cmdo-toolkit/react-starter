import { Event } from "cmdo-events";

import { User } from "../Aggregate";

export type Data = Pick<User, "id" | "email">;

export class UserEmailSet extends Event<Data> {
  public static readonly type = "UserEmailSet" as const;
}
