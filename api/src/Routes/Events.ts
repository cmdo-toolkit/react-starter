import { Descriptor } from "cmdo-events";
import { Action, Route } from "cmdo-socket";

import { collection } from "../Data/Collections";
import { hasData } from "../Policies/hasData";
import { store } from "../Providers/EventStore";
import { wss } from "../Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Actions
 |--------------------------------------------------------------------------------
 */

const add: Action<Descriptor> = async function (socket, descriptor) {
  // const permission = socket.auth.access.get(descriptor.stream).can("add", descriptor.event.type);
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to add this event to the stream");
  // }
  const inserted = await store.add(descriptor);
  if (inserted) {
    for (const stream of descriptor.streams) {
      socket.to(`stream:${stream}`).emit("event", inserted);
    }
  }
  return this.respond();
};

const get: Action<{ stream: string; checkpoint?: string }> = async function (_, { stream, checkpoint }) {
  // const permission = socket.auth.access.get(stream).can("get", "events");
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to get events on this stream");
  // }
  const filter: any = { streams: stream };
  if (checkpoint) {
    filter["event.meta.revised"] = {
      $gt: checkpoint
    };
  }
  return this.respond(await collection.events.find(filter).sort({ "event.meta.revised": 1 }).toArray());
};

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

wss.register([Route.on("events.add", [hasData(["id", "streams", "event"]), add]), Route.on("events.get", [hasData(["stream"]), get])]);
