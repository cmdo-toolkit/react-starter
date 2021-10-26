import { Services, Socket } from "cmdo-socket-client";

import { config } from "../../Config";
import { Channels } from "./Channels";
import { Streams } from "./Streams";

/*
 |--------------------------------------------------------------------------------
 | Socket
 |--------------------------------------------------------------------------------
 */

export const socket = new Socket({
  uri: config.socket,
  services: {
    channels: Channels,
    streams: Streams
  }
}) as Socket &
  Services<{
    channels: Channels;
    streams: Streams;
  }>;

/*
 |--------------------------------------------------------------------------------
 | Debug
 |--------------------------------------------------------------------------------
 */

declare global {
  interface Window {
    socket: Socket;
  }
}

window.socket = socket;
