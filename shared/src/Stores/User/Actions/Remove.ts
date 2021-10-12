import { action } from "cmdo-events";

import { Data, UserRemoved } from "../Events/UserRemoved";

export const remove = action<Data>(async function (data, { store }) {
  // const permission = auth.access.get(streamId).can("remove", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  await store.save("toolkit", new UserRemoved(data));
});
