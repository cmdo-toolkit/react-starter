import { project } from "cmdo-events";
import { UserCreated, UserEmailSet, UserNameSet, UserRemoved } from "shared";

import { collections } from "../Collections";

project.continuous(UserCreated, async ({ data }) => {
  await collections.users().insert({
    id: data.id,
    name: data.name,
    email: data.email
  });
});

project.continuous(UserNameSet, async ({ data }) => {
  await collections.users().update({
    id: data.id,
    name: data.name
  });
});

project.continuous(UserEmailSet, async ({ data }) => {
  await collections.users().update({
    id: data.id,
    email: data.email
  });
});

project.continuous(UserRemoved, async ({ data }) => {
  await collections.users().delete(data.id);
});
