import { AccessControl, createAllFilter } from "cmdo-auth";

import { USER_FLAGS } from "./Constants";

export async function setup(userId: string): Promise<void> {
  await AccessControl.for(userId).then((access) =>
    access
      .grants(userId)
      .grant("user", "setName")
      .grant("user", "setEmail")
      .grant("user", "read", {
        owner: createAllFilter(USER_FLAGS),
        friends: USER_FLAGS.userId | USER_FLAGS.name | USER_FLAGS.email,
        public: USER_FLAGS.userId | USER_FLAGS.name
      })
      .grant("user", "remove")
      .commit()
  );
}
