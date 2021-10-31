import { action } from "cmdo-events";

import { Data, UserEmailSet } from "../Events/UserEmailSet";
import { reducer } from "../Reducer";

export const setEmail = action<Data>(async function (data, { store }) {
  // const permission = auth.access.get(streamId).can("setEmail", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const user = await store.reduce(reducer, { "event.data.id": data.id });
  if (!user) {
    throw new Error("User not found");
  }
  await store.save(["toolkit", `toolkit-user-${data.id}`], new UserEmailSet(data));
});
