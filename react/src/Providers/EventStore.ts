import { container, Descriptor, Store } from "cmdo-events";
import { nanoid } from "nanoid";
import { Event, events } from "shared";

import { collections } from "../Data/Collections";

export const store = new (class MingoEventStore extends Store {
  public async insert({ id, stream, event }: Descriptor) {
    const count = await getStream(stream).count({
      stream,
      "event.data.id": event.data.id,
      "event.meta.created": event.meta.created
    });
    if (count === 0) {
      return getStream(stream).insert({ id, stream, event });
    }
  }

  public async outdated({ stream, event }: Descriptor) {
    const count = await getStream(stream).count({
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

export function getStream(name: string) {
  return collections.events(name);
}
