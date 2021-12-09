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
      if (socket.isConnected) {
        await this.sync(streamId);
      }
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
      this.pull(streamId);
    }

    public unsubscribe(streamId: string): void {
      socket.streams.leave(streamId);
      delete streams[streamId];
    }

    private async sync(streamId: string) {
      await this.pull(streamId);
      // await this.push(streamId);
    }

    /**
     * Pull the events from the connected socket to ensure we are on the latest
     * central node version of the stream. This operation keeps repeating itself
     * until it pulls an empty event array signifying we are now up to date
     * with the central node.
     *
     * A simple itteration guard is added so that we can escape out of a potential
     * infinite loop.
     */
    private async pull(streamId: string, itteration = 0) {
      if (itteration > 100) {
        throw new Error("Encountered more than 100 stream pull operations, an infinite loop may be at large!");
      }
      socket
        .send("streams.pull", { streamId, hash: await this.getRemoteCursor(streamId) })
        .then(async (events: EventRecord<Event>[]) => {
          if (events.length > 0) {
            for (const event of events) {
              await store.insert(event);
            }
            await this.setRemoteCursor(streamId, events[events.length - 1].commit);
            return this.pull(streamId, itteration + 1); // keep pulling the stream until its hydrated
          }
        });
    }

    private async setRemoteCursor(streamId: string, commit: string) {
      await collection.streams.upsert({ id: streamId, commit });
    }

    private async getRemoteCursor(streamId: string) {
      const stream = await collection.streams.findOne({ id: streamId });
      if (stream) {
        return stream.commit;
      }
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
