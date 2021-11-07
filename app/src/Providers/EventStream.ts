import { Descriptor, Stream } from "cmdo-events";
import debug from "debug";

import { store } from "./EventStore";
import { socket } from "./Socket";

const log = {
  subscriber: debug("subscriber"),
  checkpoint: debug("subscriber:checkpoint")
};

/*
 |--------------------------------------------------------------------------------
 | Event Subscriber
 |--------------------------------------------------------------------------------
 */

export class EventStream extends Stream {
  public async connect(): Promise<void> {
    await socket.streams.join(this.name);
    log.subscriber("[%s] connected", this.name);
  }

  public async addEvent(descriptor: Descriptor): Promise<void> {
    await store.add(descriptor);
  }

  public async getEvents(): Promise<Descriptor[]> {
    return socket.send("events.get", { stream: this.name, checkpoint: await this.getCheckpoint() });
  }

  public async setCheckpoint(value: string): Promise<void> {
    log.checkpoint("[%s] set %s", this.name, value);
    localStorage.setItem(`checkpoint.${this.name}`, value);
  }

  public async getCheckpoint(): Promise<string | undefined> {
    log.checkpoint("[%s] get", this.name);
    return localStorage.getItem(`checkpoint.${this.name}`) || undefined;
  }
}

/*
 |--------------------------------------------------------------------------------
 | Event Handlers
 |--------------------------------------------------------------------------------
 */

socket.on("connected", () => {
  EventStream.connect();
});

socket.on("events", ({ descriptors }) => {
  for (const descriptor of descriptors) {
    EventStream.push(descriptor);
  }
});

socket.on("event", (descriptor) => {
  EventStream.push(descriptor);
});

store.on("saved", (descriptor) => {
  EventStream.push(descriptor);
  socket.send("events.add", descriptor);
});

socket.on("disconnected", () => {
  EventStream.disconnect();
});
