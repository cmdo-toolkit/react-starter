import { container, Descriptor, Store } from "cmdo-events";
import { nanoid } from "nanoid";
import { Event, events } from "shared";

import { collections } from "../Data/Collections";

export const store = new (class MingoEventStore extends Store<Event> {
  public async insert({ id, streams, event }: Descriptor) {
    const count = await collections.events.count({
      streams: {
        $in: streams
      },
      "event.data.id": event.data.id,
      "event.meta.created": event.meta.created
    });
    if (count === 0) {
      return collections.events.insert({ id, streams, event });
    }
  }

  public async find(filter: any): Promise<Event[]> {
    return collections.events.find(filter, { sort: { "event.meta.created": 1 } }).then((events) => {
      return events.map((descriptor) => this.toEvent(descriptor));
    });
  }

  public async outdated({ streams, event }: Descriptor) {
    const count = await collections.events.count({
      streams: {
        $in: streams
      },
      "event.type": event.type,
      "event.data.id": event.data.id,
      "event.meta.created": {
        $gt: event.meta.created
      }
    });
    return count > 0;
  }

  public descriptor(streams: string[], event: Event): Descriptor {
    return { id: nanoid(), streams, event: event.toJSON() };
  }
})(events);

container.set("Store", store);
