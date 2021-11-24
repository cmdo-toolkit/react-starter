import { action } from "cmdo-events";

import { User } from "./Aggregate";
import { user } from "./Factories";
import { reducer } from "./Reducer";

export const create = action<Pick<User, "id" | "name" | "email">>(async function ({ id, name, email }, { reduce, save }) {
  // const permission = auth.access.get(stream.name).can("create", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const state = await reduce(id, reducer);
  if (state) {
    throw new Error("User already exists");
  }
  await save(user.created(id, { name, email }));
});

export const setName = action<Pick<User, "id" | "name">>(async function ({ id, name }, { reduce, save }) {
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
  await save(user.nameSet(id, { name }));
});

export const setEmail = action<Pick<User, "id" | "email">>(async function ({ id, email }, { reduce, save }) {
  // const permission = auth.access.get(stream.name).can("setEmail", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("User not found");
  }
  await save(user.emailSet(id, { email }));
});

export const remove = action<Pick<User, "id">>(async function ({ id }, { reduce, save }) {
  // const permission = auth.access.get(stream.name).can("remove", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const state = await reduce(id, reducer);
  if (!state) {
    throw new Error("User not found");
  }
  await save(user.removed(id));
});
