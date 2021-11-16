import { action } from "cmdo-events";

import { Data, UserRemoved } from "../Events/UserRemoved";
import { reducer } from "../Reducer";

export const remove = action<Data>(async function (data, { streams }) {
  const stream = streams.get(`toolkit-user-${data.id}`);
  // const permission = auth.access.get(stream.name).can("remove", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const user = await stream.reduce(reducer);
  if (!user) {
    throw new Error("User not found");
  }
  await stream.save(new UserRemoved(data));
});
