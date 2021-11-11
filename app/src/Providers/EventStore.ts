import { container, EventDescriptor, EventStore } from "cmdo-events";
import { nanoid } from "nanoid";
import { Event, events } from "shared";

import { collections } from "../Collections";

container.set(
  "EventStore",
  new (class MingoEventStore extends EventStore<Event> {
    public async append(descriptor: EventDescriptor) {
      if (await collections.events.findOne({ stream: descriptor.stream, "event.hash": descriptor.event.hash })) {
        return descriptor;
      }
      return collections.events.insert({
        id: nanoid(),
        ...descriptor
      });
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
      return collections.events.find(filter, { sort: { "event.meta.created": 1 } });
    }

    public async getLastEventByStream(stream: string): Promise<EventDescriptor | undefined> {
      return collections.events.findOne({ stream }, { sort: { "event.meta.created": -1 } });
    }

    public async outdated({ stream, event }: EventDescriptor) {
      const count = await collections.events.count({
        stream,
        "event.type": event.type,
        "event.data.id": event.data.id,
        "event.meta.created": {
          $gt: event.meta.created
        }
      });
      return count > 0;
    }
  })(events)
);
