import { container, EventRecord, EventStore } from "cmdo-events";

import { collection } from "../Collections";

export const store = new (class MongoEventStore implements EventStore {
  public async append(event: EventRecord) {
    await collection.events.insertOne({ ...event });
    return event;
  }

  public async getByStream(id: string, cursor?: string, direction: -1 | 1 = 1): Promise<EventRecord[]> {
    const filter: any = { "data.id": id };
    if (cursor) {
      filter.event = {
        "hash.commit": {
          [direction === 1 ? "$gt" : "$lt"]: cursor
        }
      };
    }
    return collection.events.find(filter, { sort: [["meta.timestamp", 1]] }).toArray();
  }

  public async getLastEventByStream(id: string) {
    const event = await collection.events.findOne({ "data.id": id }, { sort: [["event.meta.created", -1]] });
    if (event) {
      return event;
    }
  }

  public async outdated({ type, data: { id }, meta: { timestamp } }: EventRecord) {
    const count = await collection.events.count({
      type,
      "data.id": id,
      "meta.timestamp": {
        $gt: timestamp
      }
    });
    return count > 0;
  }
})();

container.set("EventStore", store);
