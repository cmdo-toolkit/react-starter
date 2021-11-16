import { Event } from "cmdo-events";

import { User } from "../Aggregate";

export type Data = Pick<User, "id" | "name">;

export class UserNameSet extends Event<Data> {
  public static readonly type = "UserNameSet" as const;
}
