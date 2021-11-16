import { Event } from "cmdo-events";

import { User } from "../Aggregate";

export type Data = Pick<User, "id">;

export class UserRemoved extends Event<Data> {
  public static readonly type = "UserRemoved" as const;
}
