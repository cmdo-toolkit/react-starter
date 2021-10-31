import { container, Descriptor, Store } from "cmdo-events";
import { nanoid } from "nanoid";
import { Event, events } from "shared";

import { mongo } from "../Lib/Mongo";

export const store = new (class MongoEventStore extends Store<Event> {
  public readonly collection = mongo.collection<Descriptor>("events");

  public async insert({ id, streams, event }: Descriptor) {
    const isDuplicate = await this.collection.count({
      streams: { $in: streams },
      "event.data.id": event.data.id,
      "event.meta.created": event.meta.created
    });
    if (!isDuplicate) {
      return this.collection.insertOne({ id, streams, event });
    }
  }

  public async find(filter: any): Promise<Event[]> {
    return this.collection
      .find(filter)
      .sort({
        "event.meta.created": 1
      })
      .toArray()
      .then((events) => {
        return events.map((descriptor) => this.toEvent(descriptor));
      });
  }

  public async outdated({ streams, event }: Descriptor) {
    const count = await this.collection.count({
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
    return {
      id: nanoid(),
      streams,
      event: event.toJSON()
    };
  }
})(events);

container.set("Store", store);
