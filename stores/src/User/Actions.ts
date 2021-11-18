import { action } from "cmdo-events";

import { UserCreated, UserEmailSet, UserNameSet, UserRemoved } from "./Events";
import { event } from "./Factories";
import { reducer } from "./Reducer";

export const create = action<UserCreated["data"]>(async function (data, { append, reduce }) {
  // const permission = auth.access.get(stream.name).can("create", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const user = await reduce(data.id, reducer);
  if (user) {
    throw new Error("User already exists");
  }
  await append(event.created(data));
});

export const setName = action<UserNameSet["data"]>(async function (data, { append, reduce }) {
  // const permission = auth.access.get(stream.name).can("setName", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const user = await reduce(data.id, reducer);
  if (!user) {
    throw new Error("User not found");
  }
  if (user.name === data.name) {
    throw new Error("Set Name Violation: Value of 'name' has not changed");
  }
  await append(event.nameSet(data));
});

export const setEmail = action<UserEmailSet["data"]>(async function (data, { append, reduce }) {
  // const permission = auth.access.get(stream.name).can("setEmail", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const user = await reduce(data.id, reducer);
  if (!user) {
    throw new Error("User not found");
  }
  await append(event.emailSet(data));
});

export const remove = action<UserRemoved["data"]>(async function (data, { append, reduce }) {
  // const permission = auth.access.get(stream.name).can("remove", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const user = await reduce(data.id, reducer);
  if (!user) {
    throw new Error("User not found");
  }
  await append(event.removed(data));
});
