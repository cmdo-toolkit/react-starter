import { projection } from "cmdo-events";
import type { AccountActivated, AccountClosed, AccountCreated } from "stores";
import { access } from "stores";

import { collection } from "../Collections";

projection.on<AccountCreated>("AccountCreated", async ({ streamId, data: { email } }) => {
  await collection.accounts.insertOne({
    id: streamId,
    status: "onboarding",
    username: "",
    email,
    token: ""
  });
  await access.account.setup(streamId);
});

projection.on<AccountActivated>("AccountActivated", async ({ streamId }) => {
  await collection.accounts.updateOne({ id: streamId }, { $set: { status: "active" } });
});

projection.on<AccountClosed>("AccountClosed", async ({ streamId }) => {
  await collection.accounts.updateOne({ id: streamId }, { $set: { status: "closed" } });
});
