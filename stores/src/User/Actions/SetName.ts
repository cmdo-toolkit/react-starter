import { createAction } from "cmdo-events";

import { User } from "../Aggregate";
import { user } from "../Factories";
import { reducer } from "../Reducer";

export const setName = createAction<Pick<User, "userId" | "name">>(async function ({ userId, name }, { auth, reduce, append }) {
  const permission = auth.access.get(userId).can("setName", "user");
  if (!permission.granted) {
    throw new Error(permission.message);
  }
  const state = await reduce(userId, reducer);
  if (!state) {
    throw new Error("User not found");
  }
  if (state.name === name) {
    throw new Error("Set Name Violation: Value of 'name' has not changed");
  }
  await append(userId, user.nameSet({ data: { name } }));
});
