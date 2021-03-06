import { container, createEventRecord, EventBase, EventStream, ReduceHandler } from "cmdo-events";

import { collection } from "../Collections";

container.set(
  "EventStream",
  new (class MongoEventStream implements EventStream {
    public async append<Event extends EventBase>(streamId: string, event: Event, store = container.get("EventStore")) {
      const parent = await this.getLastEvent(streamId);
      const record = createEventRecord(streamId, event, {
        height: (parent?.height === undefined ? -1 : parent.height) + 1,
        parent: parent?.commit
      });
      await store.insert(record, false);
    }

    public async reduce<Reduce extends ReduceHandler>(streamId: string, reduce: Reduce) {
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
      return collection.events.find(filter).sort("height").toArray();
    }

    public async getLastEvent(streamId: string) {
      return collection.events.findOne({ streamId }, { sort: { height: -1 } });
    }

    public subscribe(): void {
      // server does not handle subscriptions
    }

    public unsubscribe(): void {
      // server does not handle subscriptions
    }
  })()
);
