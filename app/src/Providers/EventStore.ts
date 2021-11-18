import { container, EventRecord, EventStore } from "cmdo-events";
import { nanoid } from "nanoid";

import { collections } from "../Collections";

container.set(
  "EventStore",
  new (class MingoEventStore implements EventStore {
    public async append(event: EventRecord) {
      console.log("Append event", event);
      const record = await collections.events.findOne({ "data.id": event.data.id, "hash.commit": event.hash.commit });
      if (record) {
        console.log("has record", record);
        return event;
      }
      return await collections.events.insert({
        id: nanoid(),
        ...event
      });
    }

    public async getByStream(stream: string, cursor?: string, direction: -1 | 1 = 1) {
      const filter: any = { "data.id": stream };
      if (cursor) {
        filter["hash.commit"] = {
          [direction === 1 ? "$gt" : "$lt"]: cursor
        };
      }
      return collections.events.find(filter, { sort: { "meta.timestamp": 1 } });
    }

    public async getLastEventByStream(id: string) {
      return collections.events.findOne({ "data.id": id }, { sort: { "meta.timestamp": -1 } });
    }

    public async outdated({ type, data: { id }, meta: { timestamp } }: EventRecord) {
      const count = await collections.events.count({
        type,
        "data.id": id,
        "meta.timestamp": {
          $gt: timestamp
        }
      });
      return count > 0;
    }
  })()
);
