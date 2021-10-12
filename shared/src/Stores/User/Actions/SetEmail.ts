import { action } from "cmdo-events";

import { Data, UserEmailSet } from "../Events/UserEmailSet";

export const setEmail = action<Data>(async function (data, { store }) {
  // const permission = auth.access.get(streamId).can("setEmail", "user");
  // if (!permission.granted) {
  //   throw new Error(permission.message);
  // }
  await store.save("toolkit", new UserEmailSet(data));
});
