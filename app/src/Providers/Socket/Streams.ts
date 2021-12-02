import type { Socket } from "cmdo-socket-client";
import { log, Service } from "cmdo-socket-client";

const debug = log.socket.extend("streams");

/*
 |--------------------------------------------------------------------------------
 | Service
 |--------------------------------------------------------------------------------
 */

export class Streams implements Service {
  private readonly streams = new Set<string>();

  constructor(public readonly socket: Socket) {}

  /*
   |--------------------------------------------------------------------------------
   | Factories
   |--------------------------------------------------------------------------------
   */

  public static create(socket: Socket) {
    return new this(socket);
  }

  /*
   |--------------------------------------------------------------------------------
   | Accessors
   |--------------------------------------------------------------------------------
   */

  public get streamsIds(): string[] {
    return Array.from(this.streams);
  }

  /*
   |--------------------------------------------------------------------------------
   | Socket Events
   |--------------------------------------------------------------------------------
   */

  public async onConnect(): Promise<void> {
    for (const streamId of Array.from(this.streams)) {
      this.join(streamId);
    }
  }

  /*
   |--------------------------------------------------------------------------------
   | Utilities
   |--------------------------------------------------------------------------------
   */

  public async join(streamId: string) {
    return this.socket
      .send("streams.join", { streamId })
      .then(() => {
        debug("joined %s", streamId);
        this.streams.add(streamId);
        return this;
      })
      .catch((error) => {
        debug("error %s %O", streamId, error);
      });
  }

  public async leave(streamId: string) {
    return this.socket.send("streams.leave", { streamId }).then(() => {
      debug("left %s", streamId);
      this.streams.delete(streamId);
      return this;
    });
  }
}
