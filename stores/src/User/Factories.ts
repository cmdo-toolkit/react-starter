import { createEvent } from "cmdo-events";

import type { UserCreated, UserEmailSet, UserNameSet, UserRemoved } from "./Events";

export const user = {
  created: createEvent<UserCreated>("UserCreated"),
  emailSet: createEvent<UserEmailSet>("UserEmailSet"),
  nameSet: createEvent<UserNameSet>("UserNameSet"),
  removed: createEvent<UserRemoved>("UserRemoved")
};
