import { project } from "cmdo-events";
import { AccountActivated, AccountClosed, AccountCreated } from "shared";

import { Attributes } from "../Lib/Account";
import { event } from "../Lib/Account/Event";
import { mongo } from "../Lib/Mongo";

project.on(AccountCreated, async ({ data: { id, email } }) => {
  const attributes: Attributes = {
    id,
    status: "onboarding",
    username: "",
    email,
    token: ""
  };
  await mongo.collection<Attributes>("accounts").insertOne(attributes);
  event.created(attributes);
});

project.on(AccountActivated, async ({ data: { id } }) => {
  await mongo.collection<Attributes>("accounts").updateOne({ id }, { $set: { status: "active" } });
});

project.on(AccountClosed, async ({ data: { id } }) => {
  await mongo.collection<Attributes>("accounts").updateOne({ id }, { $set: { status: "closed" } });
});
