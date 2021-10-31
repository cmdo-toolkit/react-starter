import { action } from "cmdo-events";

import { Data, UserNameSet } from "../Events/UserNameSet";
import { reducer } from "../Reducer";

export const setName = action<Data>(async function (data, { store }) {
  // const permission = auth.access.get(streamId).can("setName", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const user = await store.reduce(reducer, { "event.data.id": data.id });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.name === data.name) {
    throw new Error("Set Name Violation: Value of 'name' has not changed");
  }
  await store.save(["toolkit", `toolkit-user-${data.id}`], new UserNameSet(data));
});
