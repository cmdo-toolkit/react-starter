import { action } from "cmdo-events";

import { Data, UserCreated } from "../Events/UserCreated";
import { reducer } from "../Reducer";

export const create = action<Data>(async function (data, { streams }) {
  const stream = streams.get(`toolkit-user-${data.id}`);
  // const permission = auth.access.get(stream.name).can("create", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  const user = await stream.reduce(reducer);
  if (user) {
    throw new Error("User already exists");
  }
  await stream.save(new UserCreated(data));
});
