import { getEventFactory } from "cmdo-events";

import type { AccountActivated, AccountClosed, AccountCreated, AccountEmailSet, AccountUsernameSet } from "./Events";

export const event = {
  created: getEventFactory<AccountCreated>("AccountCreated"),
  activated: getEventFactory<AccountActivated>("AccountActivated"),
  usernameSet: getEventFactory<AccountUsernameSet>("AccountUsernameSet"),
  emailSet: getEventFactory<AccountEmailSet>("AccountEmailSet"),
  closed: getEventFactory<AccountClosed>("AccountClosed")
};
