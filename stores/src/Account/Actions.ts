import { action } from "cmdo-events";

import { Account } from "./Aggregate";
import { account } from "./Factories";
import { reducer } from "./Reducer";

export const create = action<Pick<Account, "id" | "email">>(async function ({ id, email }, { reduce, save }) {
  try {
    const state = await reduce(id, reducer);
    if (state) {
      throw new Error("Account already exists");
    }
    await save(account.created(id, { email }));
  } catch (error) {
    console.log("Failed to created account", error);
  }
});

export const activate = action<Pick<Account, "id">>(async function ({ id }, { reduce, save }) {
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.status === "active") {
    throw new Error("Account is already active");
  }
  await save(account.activated(id));
});

export const setEmail = action<Pick<Account, "id" | "email">>(async function ({ id, email }, { reduce, save }) {
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.email === email) {
    throw new Error("Email already set");
  }
  await save(account.emailSet(id, { email }));
});

export const setUsername = action<Pick<Account, "id" | "username">>(async function ({ id, username }, { reduce, save }) {
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.username === username) {
    throw new Error("Username already set");
  }
  await save(account.usernameSet(id, { username }));
});

export const close = action<Pick<Account, "id">>(async function ({ id }, { reduce, save }) {
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.status === "closed") {
    throw new Error("Account is already closed");
  }
  await save(account.closed(id));
});
