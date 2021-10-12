import { action } from "cmdo-events";

import { Data, UserCreated } from "../Events/UserCreated";

export const create = action<Data>(async function (data, { store }) {
  // const permission = auth.access.get(streamId).can("create", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  await store.save("toolkit", new UserCreated(data));
});
