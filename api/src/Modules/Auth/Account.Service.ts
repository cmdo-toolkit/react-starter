import { nanoid } from "nanoid";
import { stores } from "stores";

import { collection } from "../../Collections";

/*
 |--------------------------------------------------------------------------------
 | Create
 |--------------------------------------------------------------------------------
 */

export async function create(email: string) {
  await stores.account.create({ accountId: nanoid(), email });
  return getByEmail(email);
}

/*
 |--------------------------------------------------------------------------------
 | Read
 |--------------------------------------------------------------------------------
 */

export async function getByEmailOrCreate(email: string) {
  const account = await getByEmail(email);
  if (account) {
    return account;
  }
  return create(email);
}

export async function getByUsername(username: string) {
  return collection.accounts.findOne({ username });
}

export async function getByEmail(email: string) {
  return collection.accounts.findOne({ email });
}
