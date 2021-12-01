import { createAction } from "cmdo-events";

import { User } from "./Aggregate";
import { user } from "./Factories";
import { reducer } from "./Reducer";

export const create = createAction<Pick<User, "id" | "name" | "email">>(async function ({ id, name, email }, { reduce, append }) {
  // const permission = auth.access.get(stream.name).can("create", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const streamId = createStreamId(id);
  const state = await reduce(streamId, reducer);
  if (state) {
    throw new Error("User already exists");
  }
  await append(streamId, user.created({ data: { id, name, email } }));
});

export const setName = createAction<Pick<User, "id" | "name">>(async function ({ id, name }, { reduce, append }) {
  // const permission = auth.access.get(stream.name).can("setName", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const streamId = createStreamId(id);
  const state = await reduce(streamId, reducer);
  if (!state) {
    throw new Error("User not found");
  }
  if (state.name === name) {
    throw new Error("Set Name Violation: Value of 'name' has not changed");
  }
  await append(streamId, user.nameSet({ data: { id, name } }));
});

export const setEmail = createAction<Pick<User, "id" | "email">>(async function ({ id, email }, { reduce, append }) {
  // const permission = auth.access.get(stream.name).can("setEmail", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const streamId = createStreamId(id);
  const state = await reduce(streamId, reducer);
  if (!state) {
    throw new Error("User not found");
  }
  await append(streamId, user.emailSet({ data: { id, email } }));
});

export const remove = createAction<Pick<User, "id">>(async function ({ id }, { reduce, append }) {
  // const permission = auth.access.get(stream.name).can("remove", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const streamId = createStreamId(id);
  const state = await reduce(streamId, reducer);
  if (!state) {
    throw new Error("User not found");
  }
  await append(streamId, user.removed({ data: { id } }));
});

function createStreamId(userId: string) {
  return `user-${userId}`;
}
