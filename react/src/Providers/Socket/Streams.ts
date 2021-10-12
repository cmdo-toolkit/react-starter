import type { Socket } from "cmdo-socket-client";
import { log, Service } from "cmdo-socket-client";

const debug = log.socket.extend("streams");

/*
 |--------------------------------------------------------------------------------
 | Service
 |--------------------------------------------------------------------------------
 */

//#region

export class Streams implements Service {
  private readonly streams = new Set<string>();

  constructor(public readonly socket: Socket) {}

  /*
   |--------------------------------------------------------------------------------
   | Factories
   |--------------------------------------------------------------------------------
   */

  //#region

  public static create(socket: Socket) {
    return new this(socket);
  }

  //#endregion

  /*
   |--------------------------------------------------------------------------------
   | Accessors
   |--------------------------------------------------------------------------------
   */

  //#region

  public get streamsIds(): string[] {
    return Array.from(this.streams);
  }

  //#endregion

  /*
   |--------------------------------------------------------------------------------
   | Socket Events
   |--------------------------------------------------------------------------------
   */

  //#region

  public async onConnect(): Promise<void> {
    for (const streamId of Array.from(this.streams)) {
      this.join(streamId);
    }
  }

  //#endregion

  /*
   |--------------------------------------------------------------------------------
   | Utilities
   |--------------------------------------------------------------------------------
   */

  //#region

  public async join(stream: string) {
    return this.socket
      .post("streams.join", { stream })
      .then(() => {
        debug("joined %s", stream);
        this.streams.add(stream);
        return this;
      })
      .catch((error) => {
        debug("error %s %O", stream, error);
      });
  }

  public async leave(stream: string) {
    return this.socket.post("streams.leave", { stream }).then(() => {
      debug("left %s", stream);
      this.streams.delete(stream);
      return this;
    });
  }

  //#endregion
}

//#endregion
