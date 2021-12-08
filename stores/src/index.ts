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
 | Access
 |--------------------------------------------------------------------------------
 */

import * as accountAccess from "./Account/Access";
import * as userAccess from "./User/Access";

export const access = {
  account: accountAccess,
  user: userAccess
};

/*
 |--------------------------------------------------------------------------------
 | Events
 |--------------------------------------------------------------------------------
 */

import { AccountCreated, AccountActivated, AccountEmailSet, AccountClosed } from "./Account/Events";
import { UserCreated, UserEmailSet, UserNameSet, UserRemoved } from "./User/Events";

export type Event =
  | AccountCreated
  | AccountActivated
  | AccountEmailSet
  | AccountClosed
  | UserCreated
  | UserEmailSet
  | UserNameSet
  | UserRemoved;

export {
  AccountCreated,
  AccountActivated,
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

import * as accountActions from "./Account/Actions";
import * as userActions from "./User/Actions";

export const stores = {
  account: accountActions,
  user: userActions
};
