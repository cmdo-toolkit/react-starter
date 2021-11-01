import { Descriptor } from "cmdo-events";

import { mongo } from "../Lib/Mongo";

export const collection = {
  events: mongo.collection<Descriptor>("events")
};

export async function loadCollections() {
  await loadEventsIndexes();
}

async function loadEventsIndexes() {
  await collection.events.createIndexes([
    {
      key: { id: 1 },
      unique: true
    },
    { name: "duplicate", key: { streams: 1, "event.data.id": 1, "event.meta.created": 1 } },
    { name: "outdated", key: { streams: 1, "event.type": 1, "event.data.id": 1, "event.meta.created": 1 } },
    { name: "checkpoint", key: { streams: 1, "event.meta.revised": 1 } }
  ]);
}
