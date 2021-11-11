import { container, EventDescriptor, EventStore } from "cmdo-events";
import { Event, events } from "shared";

import { collection } from "../Data/Collections";

export const store = new (class MongoEventStore extends EventStore<Event> {
  public async append(descriptor: EventDescriptor) {
    if (await collection.events.findOne({ stream: descriptor.stream, "event.hash": descriptor.event.hash })) {
      return descriptor;
    }
    await collection.events.insertOne({ ...descriptor });
    return descriptor;
  }

  public async getByStream(stream: string, cursor?: string, direction: -1 | 1 = 1): Promise<EventDescriptor[]> {
    const filter: any = { stream };
    if (cursor) {
      filter.event = {
        hash: {
          [direction === 1 ? "$gt" : "$lt"]: cursor
        }
      };
    }
    return collection.events.find(filter, { sort: [["event.meta.created", 1]] }).toArray();
  }

  public async getLastEventByStream(stream: string): Promise<EventDescriptor | undefined> {
    const descriptor = await collection.events.findOne({ stream }, { sort: [["event.meta.created", -1]] });
    if (descriptor) {
      return descriptor;
    }
  }

  public async outdated({ stream, event }: EventDescriptor) {
    const count = await collection.events.count({
      stream,
      "event.type": event.type,
      "event.data.id": event.data.id,
      "event.meta.created": {
        $gt: event.meta.created
      }
    });
    return count > 0;
  }
})(events);

container.set("EventStore", store);
