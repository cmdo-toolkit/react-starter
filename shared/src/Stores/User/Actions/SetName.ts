import { action } from "cmdo-events";

import { Data, UserNameSet } from "../Events/UserNameSet";

export const setName = action<Data>(async function (data, { store }) {
  // const permission = auth.access.get(streamId).can("setName", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  await store.save("toolkit", new UserNameSet(data));
});
