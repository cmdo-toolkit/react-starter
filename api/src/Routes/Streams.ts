import { Action, Route } from "cmdo-socket";

import { hasData } from "../Policies/hasData";
import { store } from "../Providers/EventStore";
import { wss } from "../Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Actions
 |--------------------------------------------------------------------------------
 */

const join: Action<{ stream: string }> = async function (socket, { stream }) {
  // const permission = socket.auth.access.get(stream).can("join", "stream");
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to join this stream");
  // }
  socket.join(`stream:${stream}`);
  return this.respond();
};

const leave: Action<{ stream: string }> = async function (socket, { stream }) {
  socket.leave(`stream:${stream}`);
  return this.respond();
};

/*
 |--------------------------------------------------------------------------------
 | Store
 |--------------------------------------------------------------------------------
 */

store.on("saved", (descriptor) => {
  wss.to(`stream:${descriptor.stream}`).emit("event", descriptor);
});

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

wss.register([Route.on("streams.join", [hasData(["stream"]), join]), Route.on("streams.leave", [hasData(["stream"]), leave])]);
