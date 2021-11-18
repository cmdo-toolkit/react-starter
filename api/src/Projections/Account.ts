import { projection } from "cmdo-events";
import type { AccountActivated, AccountClosed, AccountCreated } from "stores";

import { Attributes } from "../Lib/Account";
import { mongo } from "../Lib/Mongo";

projection.on<AccountCreated>("AccountCreated", async ({ data: { id, email } }) => {
  await mongo.collection<Attributes>("accounts").insertOne({
    id,
    status: "onboarding",
    username: "",
    email,
    token: ""
  });
});

projection.on<AccountActivated>("AccountActivated", async ({ data: { id } }) => {
  await mongo.collection<Attributes>("accounts").updateOne({ id }, { $set: { status: "active" } });
});

projection.on<AccountClosed>("AccountClosed", async ({ data: { id } }) => {
  await mongo.collection<Attributes>("accounts").updateOne({ id }, { $set: { status: "closed" } });
});
