import { createAction } from "cmdo-events";

import { User } from "../Aggregate";
import { user } from "../Factories";
import { reducer } from "../Reducer";

export const setEmail = createAction<Pick<User, "userId" | "email">>(async function ({ userId, email }, { auth, reduce, append }) {
  const permission = auth.access.get(userId).can("setEmail", "user");
  if (!permission.granted) {
    throw new Error(permission.message);
  }
  const state = await reduce(userId, reducer);
  if (!state) {
    throw new Error("User not found");
  }
  await append(userId, user.emailSet({ data: { email } }));
});
