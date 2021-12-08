import { createReducer } from "cmdo-events";

import { Account } from "./Aggregate";
import type { AccountActivated, AccountAliasSet, AccountClosed, AccountCreated, AccountEmailSet, AccountNameSet } from "./Events";

type Event = AccountCreated | AccountActivated | AccountAliasSet | AccountNameSet | AccountEmailSet | AccountClosed;

export const reducer = createReducer<Account, Event>(
  {
    accountId: "",
    status: "onboarding",
    alias: "",
    name: {
      family: "",
      given: ""
    },
    email: "",
    token: ""
  },
  (state, event) => {
    switch (event.type) {
      case "AccountCreated": {
        return {
          ...state,
          accountId: event.streamId,
          email: event.data.email
        };
      }
      case "AccountActivated": {
        return {
          ...state,
          status: "active"
        };
      }
      case "AccountAliasSet": {
        return {
          ...state,
          alias: event.data.alias
        };
      }
      case "AccountNameSet": {
        return {
          ...state,
          name: event.data.name
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
