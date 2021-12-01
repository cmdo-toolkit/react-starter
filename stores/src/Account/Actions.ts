import { createAction } from "cmdo-events";

import { Account } from "./Aggregate";
import { account } from "./Factories";
import { reducer } from "./Reducer";

export const create = createAction<Pick<Account, "id" | "email">>(async function ({ id, email }, { reduce, append }) {
  const streamId = createStreamId(id);
  try {
    const state = await reduce(streamId, reducer);
    if (state) {
      throw new Error("Account already exists");
    }
    await append(streamId, account.created({ data: { id, email } }));
  } catch (error) {
    console.log("Failed to created account", error);
  }
});

export const activate = createAction<Pick<Account, "id">>(async function ({ id }, { reduce, append }) {
  const streamId = createStreamId(id);
  const state = await reduce(streamId, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.status === "active") {
    throw new Error("Account is already active");
  }
  await append(streamId, account.activated({ data: { id } }));
});

export const setEmail = createAction<Pick<Account, "id" | "email">>(async function ({ id, email }, { reduce, append }) {
  const streamId = createStreamId(id);
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.email === email) {
    throw new Error("Email already set");
  }
  await append(streamId, account.emailSet({ data: { id, email } }));
});

export const setUsername = createAction<Pick<Account, "id" | "username">>(async function ({ id, username }, { reduce, append }) {
  const streamId = createStreamId(id);
  const state = await reduce(streamId, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.username === username) {
    throw new Error("Username already set");
  }
  await append(streamId, account.usernameSet({ data: { id, username } }));
});

export const close = createAction<Pick<Account, "id">>(async function ({ id }, { reduce, append }) {
  const streamId = createStreamId(id);
  const state = await reduce(streamId, reducer);
  if (!state) {
    throw new Error("Account not found");
  }
  if (state.status === "closed") {
    throw new Error("Account is already closed");
  }
  await append(streamId, account.closed({ data: { id } }));
});

function createStreamId(accountId: string) {
  return `account-${accountId}`;
}
