import { projection } from "cmdo-events";
import { UserCreated, UserEmailSet, UserNameSet, UserRemoved } from "shared";

import { collections } from "../Collections";

projection.on(UserCreated, async ({ data }) => {
  await collections.users.insert({
    id: data.id,
    name: data.name,
    email: data.email
  });
});

projection.on(UserNameSet, async ({ data }) => {
  await collections.users.update({
    id: data.id,
    name: data.name
  });
});

projection.on(UserEmailSet, async ({ data }) => {
  await collections.users.update({
    id: data.id,
    email: data.email
  });
});

projection.on(UserRemoved, async ({ data }) => {
  await collections.users.delete(data.id);
});
