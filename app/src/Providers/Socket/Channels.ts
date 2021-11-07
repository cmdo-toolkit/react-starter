import type { Socket } from "cmdo-socket-client";
import { log, Service } from "cmdo-socket-client";

const debug = log.socket.extend("channels");

/*
 |--------------------------------------------------------------------------------
 | Service
 |--------------------------------------------------------------------------------
 */

export class Channels implements Service {
  private readonly channels = new Set<string>();

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
   | Socket Events
   |--------------------------------------------------------------------------------
   */

  public async onConnect(): Promise<void> {
    for (const channelId of Array.from(this.channels)) {
      this.join(channelId);
    }
  }

  /*
   |--------------------------------------------------------------------------------
   | Utilities
   |--------------------------------------------------------------------------------
   */

  public async join(channelId: string) {
    return this.socket
      .send("channels.join", { channelId })
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
    return this.socket.send("channels.leave", { channelId }).then(() => {
      debug("left %s", channelId);
      this.channels.delete(channelId);
      return this;
    });
  }
}
