import { container, EventRecord, EventStore, publisher } from "cmdo-events";
import type { Event } from "stores";

import { collection } from "../Collections";

export const store = new (class MongoEventStore implements EventStore<Event> {
  public async insert<Record extends EventRecord<Event>>(record: Record, hydrated = true) {
    await collection.events.insertOne({ ...record });
    publisher.project(record, { hydrated, outdated: await this.outdated(record) });
  }

  public async outdated({ streamId, type, date }: EventRecord): Promise<boolean> {
    return collection.events.count({ streamId, type, date: { $gt: date } }).then((count) => count > 0);
  }
})();

container.set("EventStore", store);
