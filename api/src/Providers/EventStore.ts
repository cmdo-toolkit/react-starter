import { container, EventRecord, EventStore } from "cmdo-events";

import { collection } from "../Collections";

export const store = new (class MongoEventStore implements EventStore {
  public async append(event: EventRecord): Promise<EventRecord> {
    await collection.events.insertOne({ ...event });
    return event;
  }

  public async getAllEvents(height?: number, direction?: 1 | -1): Promise<EventRecord[]> {
    if (height !== undefined) {
      return collection.events
        .find({
          height: {
            $gt: height
          }
        })
        .sort("height", direction ?? 1)
        .toArray();
    }
    return collection.events.find().sort("height").toArray();
  }

  public async getStreamEvents(streamId: string, commit?: string, direction?: 1 | -1): Promise<EventRecord[]> {
    const filter: any = { streamId };
    if (commit) {
      filter.commit = {
        [direction === 1 ? "$gt" : "$lt"]: commit
      };
    }
    return collection.events.find(filter).sort("height").toArray();
  }

  public async getFilteredEvents(filter: Record<string, unknown>): Promise<EventRecord[]> {
    return collection.events.find(filter).sort("height").toArray();
  }

  public async getFirstEvent(scope: "all"): Promise<EventRecord | undefined | null>;
  public async getFirstEvent(scope: "stream", streamId: string): Promise<EventRecord | undefined | null>;
  public async getFirstEvent(scope: "all" | "stream", streamId?: string): Promise<EventRecord | undefined | null> {
    switch (scope) {
      case "all": {
        return collection.events.findOne();
      }
      case "stream": {
        return collection.events.findOne({ streamId });
      }
    }
  }

  public async getLastEvent(scope: "all"): Promise<EventRecord | undefined | null>;
  public async getLastEvent(scope: "stream", streamId: string): Promise<EventRecord | undefined | null>;
  public async getLastEvent(scope: "all" | "stream", streamId?: string): Promise<EventRecord | undefined | null> {
    switch (scope) {
      case "all": {
        return collection.events.findOne();
      }
      case "stream": {
        return collection.events.findOne({ streamId });
      }
    }
  }

  public async outdated({ streamId, type, date }: EventRecord): Promise<boolean> {
    const count = await collection.events.count({ streamId, type, date: { $gt: date } });
    return count > 0;
  }
})();

container.set("EventStore", store);
