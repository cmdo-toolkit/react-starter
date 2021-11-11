import { EventDescriptor } from "cmdo-events";

import { mongo } from "../Lib/Mongo";

export const collection = {
  events: mongo.collection<EventDescriptor>("events")
};

export async function loadCollections() {
  await loadEventsIndexes();
}

async function loadEventsIndexes() {
  await collection.events.createIndexes([
    { name: "duplicate", key: { streams: 1, "event.hash": 1 } },
    { name: "outdated", key: { streams: 1, "event.type": 1, "event.data.id": 1, "event.meta.created": 1 } }
  ]);
}
