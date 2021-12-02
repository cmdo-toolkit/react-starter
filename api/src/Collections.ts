import type { EventRecord } from "cmdo-events";

import { mongo } from "./Lib/Mongo";
import type { Account } from "./Types/Account";
import type { Grants } from "./Types/Grants";

export const collection = {
  accounts: mongo.collection<Account>("accounts"),
  grants: mongo.collection<Grants>("grants"),
  events: mongo.collection<EventRecord>("events")
};

export async function loadCollections() {
  await loadEventsIndexes();
}

async function loadEventsIndexes() {
  await collection.events.createIndexes([
    { name: "height", key: { streamId: 1, height: 1 }, unique: true },
    { name: "commit", key: { streamId: 1, commit: 1 }, unique: true },
    { name: "outdated", key: { streamId: 1, type: 1, date: 1 } }
  ]);
}
