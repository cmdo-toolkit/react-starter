import { createAction } from "cmdo-events";

import { Account } from "./Aggregate";
import { account } from "./Factories";
import { reducer } from "./Reducer";

export const create = createAction<Pick<Account, "id" | "email">>(async function ({ id, email }, { reduce, append }) {
  try {
    const state = await reduce(id, reducer);
    if (state) {
      throw new Error("Account already exists");
    }
    await append(id, account.created({ data: { email } }));
  } catch (error) {
    console.log("Failed to created account", error);
  }
});

export const activate = createAction<Pick<Account, "id">>(async function ({ id }, { reduce, append }) {
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.status === "active") {
    throw new Error("Account is already active");
  }
  await append(id, account.activated({}));
});

export const setEmail = createAction<Pick<Account, "id" | "email">>(async function ({ id, email }, { reduce, append }) {
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.email === email) {
    throw new Error("Email already set");
  }
  await append(id, account.emailSet({ data: { email } }));
});

export const setUsername = createAction<Pick<Account, "id" | "username">>(async function ({ id, username }, { reduce, append }) {
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.username === username) {
    throw new Error("Username already set");
  }
  await append(id, account.usernameSet({ data: { username } }));
});

export const close = createAction<Pick<Account, "id">>(async function ({ id }, { reduce, append }) {
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.status === "closed") {
    throw new Error("Account is already closed");
  }
  await append(id, account.closed({}));
});
