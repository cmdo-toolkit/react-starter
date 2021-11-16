import { action } from "cmdo-events";

import { Data, UserEmailSet } from "../Events/UserEmailSet";
import { reducer } from "../Reducer";

export const setEmail = action<Data>(async function (data, { streams }) {
  const stream = streams.get(`toolkit-user-${data.id}`);
  // const permission = auth.access.get(stream.name).can("setEmail", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const user = await stream.reduce(reducer);
  if (!user) {
    throw new Error("User not found");
  }
  await stream.save(new UserEmailSet(data));
});
