import { project } from "cmdo-events";
import { UserCreated, UserEmailSet, UserNameSet, UserRemoved } from "shared";

import { collections } from "../Collections";

project.on(UserCreated, async ({ data }) => {
  await collections.users.insert({
    id: data.id,
    name: data.name,
    email: data.email
  });
});

project.on(UserNameSet, async ({ data }) => {
  await collections.users.update({
    id: data.id,
    name: data.name
  });
});

project.on(UserEmailSet, async ({ data }) => {
  await collections.users.update({
    id: data.id,
    email: data.email
  });
});

project.on(UserRemoved, async ({ data }) => {
  await collections.users.delete(data.id);
});
