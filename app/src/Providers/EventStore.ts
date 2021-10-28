import { container, Descriptor, Store } from "cmdo-events";
import { nanoid } from "nanoid";
import { Event, events } from "shared";

import { collections } from "../Data/Collections";

export const store = new (class MingoEventStore extends Store<Event> {
  public async insert({ id, stream, event }: Descriptor) {
    const count = await collections.events.count({
      stream,
      "event.data.id": event.data.id,
      "event.meta.created": event.meta.created
    });
    if (count === 0) {
      return collections.events.insert({ id, stream, event });
    }
  }

  public async find(filter: any): Promise<Event[]> {
    return collections.events.find(filter, { sort: { "event.meta.created": 1 } }).then((events) => {
      return events.map((descriptor) => this.toEvent(descriptor));
    });
  }

  public async outdated({ stream, event }: Descriptor) {
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

  public descriptor(stream: string, event: Event): Descriptor {
    return { id: nanoid(), stream, event: event.toJSON() };
  }
})(events);

container.set("Store", store);
