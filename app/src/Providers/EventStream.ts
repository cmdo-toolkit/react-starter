import { container, createEventRecord, EventRecord, EventStream, ReduceHandler, StreamSubscriptionHandler } from "cmdo-events";
import type { Event } from "stores";

import { collection } from "../Collections";
import { store } from "./EventStore";
import { socket } from "./Socket";

const streams: Record<string, StreamSubscriptionHandler> = {};

container.set(
  "EventStream",
  new (class WebEventStream implements EventStream<Event> {
    public async append(streamId: string, event: Event, store = container.get("EventStore")) {
      const parent = await this.getLastEvent(streamId);
      const record = createEventRecord(streamId, event, {
        height: (parent?.height === undefined ? -1 : parent.height) + 1,
        parent: parent?.commit
      });
      await store.insert(record);
      socket.send("streams.push", { events: [record] });
    }

    public async reduce<Reduce extends ReduceHandler>(streamId: string, reduce: Reduce) {
      // if (network.is("available")) {
      //   const isValid = await network.validate(streamId, await getStreamHash(streamId));
      // }
      const events = await this.getEvents(streamId);
      if (events.length) {
        return reduce(events) as ReturnType<Reduce>;
      }
    }

    public async getEvents(streamId: string, commit?: string, direction?: 1 | -1) {
      const filter: any = { streamId };
      if (commit) {
        filter.commit = {
          [direction === 1 ? "$gt" : "$lt"]: commit
        };
      }
      return collection.events.find(filter, { sort: { height: -1 } });
    }

    public async getLastEvent(streamId: string) {
      return collection.events.findOne({ streamId }, { sort: { height: -1 } });
    }

    public async subscribe(streamId: string, handler: StreamSubscriptionHandler) {
      socket.streams.join(streamId);

      streams[streamId] = handler;

      const last = await this.getLastEvent(streamId);

      socket.send("streams.pull", { streamId, hash: last?.commit }).then(async (events) => {
        for (const event of events) {
          await store.insert(event);
        }
      });
    }

    public unsubscribe(streamId: string): void {
      socket.streams.leave(streamId);
      delete streams[streamId];
    }
  })()
);

socket.on("event", (event: EventRecord<Event>) => {
  streams[event.streamId]?.(event);
});

/*
public async push(events: EventRecord[]): Promise<void> {
  console.log("Push events", events);
  return socket.send("streams.push", { events });
}
public async pull(stream: string, hash?: string): Promise<EventRecord[]> {
  return socket.send("streams.pull", { stream, hash });
}
*/
