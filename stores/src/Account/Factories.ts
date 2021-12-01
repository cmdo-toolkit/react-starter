import { createEvent } from "cmdo-events";

import type { AccountActivated, AccountClosed, AccountCreated, AccountEmailSet, AccountUsernameSet } from "./Events";

export const account = {
  created: createEvent<AccountCreated>("AccountCreated"),
  activated: createEvent<AccountActivated>("AccountActivated"),
  usernameSet: createEvent<AccountUsernameSet>("AccountUsernameSet"),
  emailSet: createEvent<AccountEmailSet>("AccountEmailSet"),
  closed: createEvent<AccountClosed>("AccountClosed")
};
