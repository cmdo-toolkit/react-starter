import { projection } from "cmdo-events";
import { UserCreated, UserEmailSet, UserNameSet, UserRemoved } from "stores";

import { collection } from "../Collections";

projection.on<UserCreated>("UserCreated", async ({ data: { id, name, email } }) => {
  await collection.users.insert({
    id,
    name,
    email
  });
});

projection.on<UserNameSet>("UserNameSet", async ({ data: { id, name } }) => {
  await collection.users.update({
    id,
    name
  });
});

projection.on<UserEmailSet>("UserEmailSet", async ({ data: { id, email } }) => {
  await collection.users.update({
    id,
    email
  });
});

projection.on<UserRemoved>("UserRemoved", async ({ data: { id } }) => {
  await collection.users.delete(id);
});
