import { EventDescriptor, Stream } from "cmdo-events";
import { Action, Route } from "cmdo-socket";

import { collection } from "../Collections";
import { hasData } from "../Policies/hasData";
import { wss } from "../Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Actions
 |--------------------------------------------------------------------------------
 */

const add: Action<EventDescriptor> = async function (socket, descriptor) {
  // const permission = socket.auth.access.get(descriptor.stream).can("add", descriptor.event.type);
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to add this event to the stream");
  // }
  const inserted = await Stream.append(descriptor);
  if (inserted) {
    socket.to(`stream:${descriptor.stream}`).emit("event", inserted);
  }
  return this.respond();
};

const get: Action<{ stream: string; hash?: string }> = async function (_, { stream, hash }) {
  // const permission = socket.auth.access.get(stream).can("get", "events");
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to get events on this stream");
  // }
  const filter: any = { streams: stream };
  if (hash) {
    filter["event.hash"] = {
      $gt: hash
    };
  }
  return this.respond(await collection.events.find(filter).sort({ "event.meta.created": 1 }).toArray());
};

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

wss.register([Route.on("events.add", [hasData(["id", "streams", "event"]), add]), Route.on("events.get", [hasData(["stream"]), get])]);
