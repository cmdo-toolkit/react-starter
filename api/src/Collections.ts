import { RoleData } from "cmdo-auth";
import type { EventRecord } from "cmdo-events";

import { mongo } from "./Lib/Mongo";
import type { Account } from "./Types/Account";

export const collection = {
  accounts: mongo.collection<Account>("accounts"),
  events: mongo.collection<EventRecord>("events"),
  roles: mongo.collection<RoleData>("roles")
};

export async function loadCollections() {
  await loadEventsIndexes();
}

async function loadEventsIndexes() {
  await collection.events.createIndexes([
    { name: "height", key: { streamId: 1, height: 1 }, unique: true },
    { name: "parent", key: { streamId: 1, parent: 1 }, unique: true },
    { name: "commit", key: { streamId: 1, commit: 1 }, unique: true },
    { name: "outdated", key: { streamId: 1, type: 1, date: 1 } }
  ]);
}
