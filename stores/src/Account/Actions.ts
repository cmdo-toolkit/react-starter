import { action } from "cmdo-events";

import { AccountActivated, AccountClosed, AccountCreated, AccountEmailSet, AccountUsernameSet } from "./Events";
import { event } from "./Factories";
import { reducer } from "./Reducer";

export const create = action<AccountCreated["data"]>(async function (data, { append, reduce }) {
  try {
    const account = await reduce(data.id, reducer);
    if (account) {
      throw new Error("Account already exists");
    }
    await append(event.created(data));
  } catch (error) {
    console.log("Failed to created account", error);
  }
});

export const activate = action<AccountActivated["data"]>(async function (data, { append, reduce }) {
  const account = await reduce(data.id, reducer);
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.status === "active") {
    throw new Error("Account is already active");
  }
  await append(event.activated(data));
});

export const setEmail = action<AccountEmailSet["data"]>(async function (data, { append, reduce }) {
  const account = await reduce(data.id, reducer);
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.email === data.email) {
    throw new Error("Email already set");
  }
  await append(event.emailSet(data));
});

export const setUsername = action<AccountUsernameSet["data"]>(async function (data, { append, reduce }) {
  const account = await reduce(data.id, reducer);
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.username === data.username) {
    throw new Error("Username already set");
  }
  await append(event.usernameSet(data));
});

export const close = action<AccountClosed["data"]>(async function (data, { append, reduce }) {
  const account = await reduce(data.id, reducer);
  if (!account) {
    throw new Error("Account not found");
  }
  if (account.status === "closed") {
    throw new Error("Account is already closed");
  }
  await append(event.closed(data));
});
