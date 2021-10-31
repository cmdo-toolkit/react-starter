import { action } from "cmdo-events";

import { Data, UserCreated } from "../Events/UserCreated";
import { reducer } from "../Reducer";

export const create = action<Data>(async function (data, { store }) {
  // const permission = auth.access.get(streamId).can("create", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const user = await store.reduce(reducer, { "event.data.id": data.id });
  if (user) {
    throw new Error("User already exists");
  }
  await store.save(["toolkit", `toolkit-user-${data.id}`], new UserCreated(data));
});
