import { action } from "cmdo-events";

import { Data, UserNameSet } from "../Events/UserNameSet";
import { reducer } from "../Reducer";

export const setName = action<Data>(async function (data, { streams }) {
  const stream = streams.get(`toolkit-user-${data.id}`);
  // const permission = auth.access.get(stream.name).can("setName", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const user = await stream.reduce(reducer);
  if (!user) {
    throw new Error("User not found");
  }
  if (user.name === data.name) {
    throw new Error("Set Name Violation: Value of 'name' has not changed");
  }
  await stream.save(new UserNameSet(data));
});
