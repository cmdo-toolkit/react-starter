import { createAction } from "cmdo-events";

import { User } from "../Aggregate";
import { user } from "../Factories";
import { reducer } from "../Reducer";

export const create = createAction<Pick<User, "accountId" | "userId" | "name" | "email">>(async function (
  { accountId, userId, name, email },
  { auth, reduce, append }
) {
  const permission = auth.access.get(accountId).can("create", "user");
  if (!permission.granted) {
    throw new Error(permission.message);
  }
  const state = await reduce(userId, reducer);
  if (state) {
    throw new Error("User already exists");
  }
  await append(userId, user.created({ data: { accountId, name, email } }));
});
