/* eslint-disable */

/*

  Stores

  The following is an auto generated index.ts file which contains the results of
  traversing the stores folder and outputting its resources depending on folder
  and file naming structures.

  This file will override any manual changes made here, so no need to edit!
  
 */

/*
 |--------------------------------------------------------------------------------
 | Events
 |--------------------------------------------------------------------------------
 */

import { AccountCreated, AccountActivated, AccountUsernameSet, AccountEmailSet, AccountClosed } from "./Account/Events";
import { UserCreated, UserEmailSet, UserNameSet, UserRemoved } from "./User/Events";

export type Event =
  | AccountCreated
  | AccountActivated
  | AccountUsernameSet
  | AccountEmailSet
  | AccountClosed
  | UserCreated
  | UserEmailSet
  | UserNameSet
  | UserRemoved;

export {
  AccountCreated,
  AccountActivated,
  AccountUsernameSet,
  AccountEmailSet,
  AccountClosed,
  UserCreated,
  UserEmailSet,
  UserNameSet,
  UserRemoved
};

/*
 |--------------------------------------------------------------------------------
 | Stores
 |--------------------------------------------------------------------------------
 */

import * as account from "./Account/Actions";
import * as user from "./User/Actions";

export const stores = {
  account,
  user
};
