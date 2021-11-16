import { Reducer } from "cmdo-events";

import { User } from "./Aggregate";
import { UserCreated } from "./Events/UserCreated";
import { UserEmailSet } from "./Events/UserEmailSet";
import { UserNameSet } from "./Events/UserNameSet";

export const reducer = new Reducer<User>()
  .set(UserCreated, (state, { data }) => {
    return {
      ...state,
      id: data.id,
      name: data.name,
      email: data.email
    };
  })
  .set(UserEmailSet, (state, { data }) => {
    return {
      ...state,
      email: data.email
    };
  })
  .set(UserNameSet, (state, { data }) => {
    return {
      ...state,
      name: data.name
    };
  });
