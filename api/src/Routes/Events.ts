import { Descriptor } from "cmdo-events";
import { Action, Route } from "cmdo-socket";

import { hasData } from "../Policies/hasData";
import { store } from "../Providers/EventStore";
import { wss } from "../Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Actions
 |--------------------------------------------------------------------------------
 */

//#region

const add: Action<Descriptor> = async function (socket, descriptor) {
  // const permission = socket.auth.access.get(descriptor.stream).can("add", descriptor.event.type);
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to add this event to the stream");
  // }
  socket.to(`stream:${descriptor.stream}`).emit("event", await store.add(descriptor));
  return this.respond();
};

const get: Action<{ stream: string; checkpoint?: string }> = async function (socket, { stream, checkpoint }) {
  // const permission = socket.auth.access.get(stream).can("get", "events");
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to get events on this stream");
  // }
  const filter: any = { stream };
  if (checkpoint) {
    filter["event.meta.localId"] = {
      $gt: checkpoint
    };
  }
  return this.respond(await store.collection.find(filter).sort({ "event.meta.localId": 1 }).toArray());
};

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

//#region

wss.register([Route.on("events.add", [hasData(["id", "stream", "event"]), add]), Route.on("events.get", [hasData(["stream"]), get])]);

//#endregion
