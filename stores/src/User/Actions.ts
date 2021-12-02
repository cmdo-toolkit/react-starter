import { createAction } from "cmdo-events";

import { User } from "./Aggregate";
import { user } from "./Factories";
import { reducer } from "./Reducer";

export const create = createAction<Pick<User, "id" | "name" | "email">>(async function ({ id, name, email }, { reduce, append }) {
  // const permission = auth.access.get(stream.name).can("create", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const state = await reduce(id, reducer);
  if (state) {
    throw new Error("User already exists");
  }
  await append(id, user.created({ data: { name, email } }));
});

export const setName = createAction<Pick<User, "id" | "name">>(async function ({ id, name }, { reduce, append }) {
  // const permission = auth.access.get(stream.name).can("setName", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("User not found");
  }
  if (state.name === name) {
    throw new Error("Set Name Violation: Value of 'name' has not changed");
  }
  await append(id, user.nameSet({ data: { name } }));
});

export const setEmail = createAction<Pick<User, "id" | "email">>(async function ({ id, email }, { reduce, append }) {
  // const permission = auth.access.get(stream.name).can("setEmail", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("User not found");
  }
  await append(id, user.emailSet({ data: { email } }));
});

export const remove = createAction<Pick<User, "id">>(async function ({ id }, { reduce, append }) {
  // const permission = auth.access.get(stream.name).can("remove", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("User not found");
  }
  await append(id, user.removed({}));
});
