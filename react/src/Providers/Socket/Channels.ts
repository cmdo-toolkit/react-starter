import type { Socket } from "cmdo-socket-client";
import { log, Service } from "cmdo-socket-client";

const debug = log.socket.extend("channels");

/*
 |--------------------------------------------------------------------------------
 | Service
 |--------------------------------------------------------------------------------
 */

//#region

export class Channels implements Service {
  private readonly channels = new Set<string>();

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
   | Socket Events
   |--------------------------------------------------------------------------------
   */

  //#region

  public async onConnect(): Promise<void> {
    for (const channelId of Array.from(this.channels)) {
      this.join(channelId);
    }
  }

  //#endregion

  /*
   |--------------------------------------------------------------------------------
   | Utilities
   |--------------------------------------------------------------------------------
   */

  //#region

  public async join(channelId: string) {
    return this.socket
      .post("channels.join", { channelId })
      .then(() => {
        debug("joined %s", channelId);
        this.channels.add(channelId);
        return this;
      })
      .catch((error) => {
        debug("error %s %O", channelId, error);
      });
  }

  public async leave(channelId: string) {
    return this.socket.post("channels.leave", { channelId }).then(() => {
      debug("left %s", channelId);
      this.channels.delete(channelId);
      return this;
    });
  }

  //#endregion
}

//#endregion
