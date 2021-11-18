import { projection } from "cmdo-events";
import { UserCreated, UserEmailSet, UserNameSet, UserRemoved } from "stores";

import { collections } from "../Collections";

projection.on<UserCreated>("UserCreated", async ({ data }) => {
  await collections.users.insert({
    id: data.id,
    name: data.name,
    email: data.email
  });
});

projection.on<UserNameSet>("UserNameSet", async ({ data }) => {
  await collections.users.update({
    id: data.id,
    name: data.name
  });
});

projection.on<UserEmailSet>("UserEmailSet", async ({ data }) => {
  await collections.users.update({
    id: data.id,
    email: data.email
  });
});

projection.on<UserRemoved>("UserRemoved", async ({ data }) => {
  await collections.users.delete(data.id);
});
