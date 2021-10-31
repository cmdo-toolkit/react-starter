import { action } from "cmdo-events";

import { Data, UserRemoved } from "../Events/UserRemoved";
import { reducer } from "../Reducer";

export const remove = action<Data>(async function (data, { store }) {
  // const permission = auth.access.get(streamId).can("remove", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const user = await store.reduce(reducer, { "event.data.id": data.id });
  if (!user) {
    throw new Error("User not found");
  }
  await store.save(["toolkit", `toolkit-user-${data.id}`], new UserRemoved(data));
});
