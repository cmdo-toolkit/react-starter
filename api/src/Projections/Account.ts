import { projection } from "cmdo-events";
import type { AccountActivated, AccountClosed, AccountCreated } from "stores";

import { Attributes } from "../Lib/Account";
import { mongo } from "../Lib/Mongo";

projection.on<AccountCreated>("AccountCreated", async ({ streamId, data: { email } }) => {
  await mongo.collection<Attributes>("accounts").insertOne({
    id: streamId,
    status: "onboarding",
    username: "",
    email,
    token: ""
  });
});

projection.on<AccountActivated>("AccountActivated", async ({ streamId }) => {
  await mongo.collection<Attributes>("accounts").updateOne({ id: streamId }, { $set: { status: "active" } });
});

projection.on<AccountClosed>("AccountClosed", async ({ streamId }) => {
  await mongo.collection<Attributes>("accounts").updateOne({ id: streamId }, { $set: { status: "closed" } });
});
