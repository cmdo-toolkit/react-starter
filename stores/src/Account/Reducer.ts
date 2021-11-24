import { createReducer } from "cmdo-events";

import { Account } from "./Aggregate";
import type { AccountActivated, AccountClosed, AccountCreated, AccountEmailSet, AccountUsernameSet } from "./Events";

type Event = AccountCreated | AccountActivated | AccountEmailSet | AccountUsernameSet | AccountClosed;

export const reducer = createReducer<Account, Event>(
  {
    id: "",
    status: "onboarding",
    username: "",
    email: "",
    token: ""
  },
  (state, event) => {
    switch (event.type) {
      case "AccountCreated": {
        return {
          id: event.streamId,
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
      case "AccountUsernameSet": {
        return {
          ...state,
          username: event.data.username
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
