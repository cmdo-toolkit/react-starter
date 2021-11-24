import { projection } from "cmdo-events";
import { UserCreated, UserEmailSet, UserNameSet, UserRemoved } from "stores";

import { collections } from "../Collections";

projection.on<UserCreated>("UserCreated", async ({ streamId, data: { name, email } }) => {
  await collections.users.insert({
    id: streamId,
    name,
    email
  });
});

projection.on<UserNameSet>("UserNameSet", async ({ streamId, data: { name } }) => {
  await collections.users.update({
    id: streamId,
    name
  });
});

projection.on<UserEmailSet>("UserEmailSet", async ({ streamId, data: { email } }) => {
  await collections.users.update({
    id: streamId,
    email
  });
});

projection.on<UserRemoved>("UserRemoved", async ({ streamId }) => {
  await collections.users.delete(streamId);
});
