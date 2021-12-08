import { createReducer } from "cmdo-events";

import { Account } from "./Aggregate";
import type { AccountActivated, AccountClosed, AccountCreated, AccountEmailSet } from "./Events";

type Event = AccountCreated | AccountActivated | AccountEmailSet | AccountClosed;

export const reducer = createReducer<Account, Event>(
  {
    accountId: "",
    status: "onboarding",
    email: "",
    token: ""
  },
  (state, event) => {
    switch (event.type) {
      case "AccountCreated": {
        return {
          accountId: event.streamId,
          status: "onboarding",
          username: "",
          email: event.data.email,
          token: ""
        };
      }
      case "AccountActivated": {
        return {
          ...state,
          status: "active"
        };
      }
      case "AccountEmailSet": {
        return {
          ...state,
          email: event.data.email
        };
      }
      case "AccountClosed": {
        return {
          ...state,
          status: "closed"
        };
      }
    }
  }
);
