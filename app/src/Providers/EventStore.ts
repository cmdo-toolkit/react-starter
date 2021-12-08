import { container, EventRecord, EventStore, publisher } from "cmdo-events";
import { nanoid } from "nanoid";
import type { Event } from "stores";

import { collection } from "../Collections";

export const store = container
  .set(
    "EventStore",
    new (class MingoEventStore implements EventStore<Event> {
      public async insert<Record extends EventRecord<Event>>(record: Record, hydrated = true) {
        const hasRecord = await collection.events.count({ streamId: record.streamId, commit: record.commit });
        if (!hasRecord) {
          collection.events.insert({ id: nanoid(), ...record });
          publisher.project(record, { hydrated, outdated: await this.outdated(record) });
        }
      }

      public async outdated({ streamId, type, date }: EventRecord<Event>) {
        return collection.events.count({ streamId, type, date: { $gt: date } }).then((count) => count > 0);
      }
    })()
  )
  .get("EventStore");
