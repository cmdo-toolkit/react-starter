import { createEvent } from "cmdo-events";

import type { AccountActivated, AccountClosed, AccountCreated, AccountEmailSet } from "./Events";

export const account = {
  created: createEvent<AccountCreated>("AccountCreated"),
  activated: createEvent<AccountActivated>("AccountActivated"),
  emailSet: createEvent<AccountEmailSet>("AccountEmailSet"),
  closed: createEvent<AccountClosed>("AccountClosed")
};
