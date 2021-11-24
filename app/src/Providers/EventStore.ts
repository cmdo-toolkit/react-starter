import { container, EventRecord, EventStore } from "cmdo-events";
import { nanoid } from "nanoid";

import { collections } from "../Collections";

container.set(
  "EventStore",
  new (class MingoEventStore implements EventStore {
    public async append(event: EventRecord): Promise<EventRecord> {
      console.log("Append event", event);
      const record = await collections.events.findOne({ streamId: event.streamId, commit: event.commit });
      if (record) {
        console.log("has record", record);
        return event;
      }
      return await collections.events.insert({ id: nanoid(), ...event });
    }

    public async getAllEvents(height?: number, direction?: 1 | -1): Promise<EventRecord[]> {
      if (height !== undefined) {
        return collections.events.find(
          {
            height: {
              $gt: height
            }
          },
          {
            sort: {
              height: direction ?? -1
            }
          }
        );
      }
      return collections.events.find();
    }

    public async getStreamEvents(streamId: string, commit?: string, direction?: 1 | -1): Promise<EventRecord[]> {
      const filter: any = { streamId };
      if (commit) {
        filter.commit = {
          [direction === 1 ? "$gt" : "$lt"]: commit
        };
      }
      return collections.events.find(filter, { sort: { height: -1 } });
    }

    public async getFilteredEvents(filter: Record<string, unknown>): Promise<EventRecord[]> {
      return collections.events.find(filter, { sort: { height: -1 } });
    }

    public async getFirstEvent(scope: "all"): Promise<EventRecord | undefined | null>;
    public async getFirstEvent(scope: "stream", streamId: string): Promise<EventRecord | undefined | null>;
    public async getFirstEvent(scope: "all" | "stream", streamId?: string): Promise<EventRecord | undefined | null> {
      switch (scope) {
        case "all": {
          return collections.events.findOne({}, { sort: { height: 1 } });
        }
        case "stream": {
          return collections.events.findOne({ streamId }, { sort: { height: 1 } });
        }
      }
    }

    public async getLastEvent(scope: "all"): Promise<EventRecord | undefined | null>;
    public async getLastEvent(scope: "stream", streamId: string): Promise<EventRecord | undefined | null>;
    public async getLastEvent(scope: "all" | "stream", streamId?: string): Promise<EventRecord | undefined | null> {
      switch (scope) {
        case "all": {
          return collections.events.findOne({}, { sort: { height: -1 } });
        }
        case "stream": {
          return collections.events.findOne({ streamId }, { sort: { height: -1 } });
        }
      }
    }

    public async outdated({ streamId, type, date }: EventRecord): Promise<boolean> {
      const count = await collections.events.count({ streamId, type, date: { $gt: date } });
      return count > 0;
    }
  })()
);
