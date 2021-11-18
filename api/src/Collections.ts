import type { EventRecord } from "cmdo-events";

import { mongo } from "./Lib/Mongo";

export const collection = {
  events: mongo.collection<EventRecord>("events")
};

export async function loadCollections() {
  await loadEventsIndexes();
}

async function loadEventsIndexes() {
  await collection.events.createIndexes([
    { name: "unique", key: { "data.id": 1, "hash.commit": 1 }, unique: true },
    { name: "outdated", key: { type: 1, "data.id": 1, "meta.timestamp": 1 } }
  ]);
}
