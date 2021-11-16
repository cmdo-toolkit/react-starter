/* eslint-disable */

/*

  CMDO Shared Stores

  The following is an auto generated mod.ts file which contains the results of
  traversing the stores folder and outputting its resources depending on folder
  and file naming structures.

  See https://go.to/docs for more information.

  This file will override any manual changes made here, so no need to edit!
  
 */

/*
 |--------------------------------------------------------------------------------
 | Events
 |--------------------------------------------------------------------------------
 */

import { AccountActivated } from "./Account/Events/AccountActivated";
import { AccountClosed } from "./Account/Events/AccountClosed";
import { AccountCreated } from "./Account/Events/AccountCreated";
import { AccountEmailSet } from "./Account/Events/AccountEmailSet";
import { AccountUsernameSet } from "./Account/Events/AccountUsernameSet";
import { UserCreated } from "./User/Events/UserCreated";
import { UserEmailSet } from "./User/Events/UserEmailSet";
import { UserNameSet } from "./User/Events/UserNameSet";
import { UserRemoved } from "./User/Events/UserRemoved";

export type Event =
  | AccountActivated
  | AccountClosed
  | AccountCreated
  | AccountEmailSet
  | AccountUsernameSet
  | UserCreated
  | UserEmailSet
  | UserNameSet
  | UserRemoved;

export const events = {
  AccountActivated,
  AccountClosed,
  AccountCreated,
  AccountEmailSet,
  AccountUsernameSet,
  UserCreated,
  UserEmailSet,
  UserNameSet,
  UserRemoved
};

export {
  AccountActivated,
  AccountClosed,
  AccountCreated,
  AccountEmailSet,
  AccountUsernameSet,
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

import * as account from "./Account/store";
import * as user from "./User/store";

export const stores = {
  account,
  user
};
