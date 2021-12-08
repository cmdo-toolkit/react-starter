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

export const access = {
  account: accountAccess
};

/*
 |--------------------------------------------------------------------------------
 | Events
 |--------------------------------------------------------------------------------
 */

import { AccountCreated, AccountActivated, AccountAliasSet, AccountNameSet, AccountEmailSet, AccountClosed } from "./Account/Events";

export type Event =
  | AccountCreated
  | AccountActivated
  | AccountAliasSet
  | AccountNameSet
  | AccountEmailSet
  | AccountClosed;

export {
  AccountCreated,
  AccountActivated,
  AccountAliasSet,
  AccountNameSet,
  AccountEmailSet,
  AccountClosed
};

/*
 |--------------------------------------------------------------------------------
 | Stores
 |--------------------------------------------------------------------------------
 */

import * as accountActions from "./Account/Actions";

export const stores = {
  account: accountActions
};
