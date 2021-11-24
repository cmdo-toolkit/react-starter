import { getEventFactory } from "cmdo-events";

import type { UserCreated, UserEmailSet, UserNameSet, UserRemoved } from "./Events";

export const user = {
  created: getEventFactory<UserCreated>("UserCreated"),
  emailSet: getEventFactory<UserEmailSet>("UserEmailSet"),
  nameSet: getEventFactory<UserNameSet>("UserNameSet"),
  removed: getEventFactory<UserRemoved>("UserRemoved")
};
