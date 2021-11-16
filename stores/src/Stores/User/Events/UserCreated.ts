import { Event } from "cmdo-events";

import { User } from "../Aggregate";

export type Data = Pick<User, "id" | "name" | "email">;

export class UserCreated extends Event<Data> {
  public static readonly type = "UserCreated" as const;
  public static readonly genesis = true;
}
