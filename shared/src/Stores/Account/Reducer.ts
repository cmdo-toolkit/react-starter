import { Reducer } from "cmdo-events";

import { Account } from "./Aggregate";
import { AccountActivated } from "./Events/AccountActivated";
import { AccountClosed } from "./Events/AccountClosed";
import { AccountCreated } from "./Events/AccountCreated";
import { AccountEmailSet } from "./Events/AccountEmailSet";
import { AccountUsernameSet } from "./Events/AccountUsernameSet";

/*
 |--------------------------------------------------------------------------------
 | Reducer
 |--------------------------------------------------------------------------------
 */

//#region

export const reducer = new Reducer<Account>()
  .set(AccountCreated, (_, { data }) => {
    return {
      id: data.id,
      status: "onboarding",
      username: "",
      email: data.email,
      token: ""
    };
  })
  .set(AccountActivated, (state) => {
    return {
      ...state,
      status: "active"
    };
  })
  .set(AccountUsernameSet, (state, { data: { username } }) => {
    return {
      ...state,
      username
    };
  })
  .set(AccountEmailSet, (state, { data: { email } }) => {
    return {
      ...state,
      email
    };
  })
  .set(AccountClosed, (state) => {
    return {
      ...state,
      status: "closed"
    };
  });

//#endregion
