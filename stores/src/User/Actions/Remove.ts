import { createAction } from "cmdo-events";

import { User } from "../Aggregate";
import { user } from "../Factories";
import { reducer } from "../Reducer";

export const remove = createAction<Pick<User, "userId">>(async function ({ userId }, { auth, reduce, append }) {
  const permission = auth.access.get(userId).can("remove", "user");
  if (!permission.granted) {
    throw new Error(permission.message);
  }
  const state = await reduce(userId, reducer);
  if (!state) {
    throw new Error("User not found");
  }
  await append(userId, user.removed({}));
});
