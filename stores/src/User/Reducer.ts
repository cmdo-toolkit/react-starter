import { createReducer } from "cmdo-events";

import { User } from "./Aggregate";
import type { UserCreated, UserEmailSet, UserNameSet, UserRemoved } from "./Events";

type Event = UserCreated | UserEmailSet | UserNameSet | UserRemoved;

export const reducer = createReducer<User, Event>(
  {
    id: "",
    name: "",
    email: ""
  },
  (state, event) => {
    switch (event.type) {
      case "UserCreated": {
        return {
          id: event.data.id,
          name: event.data.name,
          email: event.data.email
        };
      }
      case "UserEmailSet": {
        return {
          ...state,
          email: event.data.email
        };
      }
      case "UserNameSet": {
        return {
          ...state,
          name: event.data.name
        };
      }
      case "UserRemoved": {
        return state;
      }
    }
  }
);
