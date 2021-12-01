import { container, EventRecord } from "cmdo-events";
import { Action, Route } from "cmdo-socket";

import { collection } from "../Collections";
import { hasData } from "../Policies/hasData";
import { wss } from "../Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Actions
 |--------------------------------------------------------------------------------
 */

const add: Action<EventRecord> = async function (socket, event, store = container.get("EventStore")) {
  // const permission = socket.auth.access.get(descriptor.stream).can("add", descriptor.event.type);
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to add this event to the stream");
  // }
  try {
    await store.insert(event);
    socket.to(`stream:${event.streamId}`).emit("event", event);
    return this.respond();
  } catch (error) {
    return this.reject(error.message);
  }
};

const get: Action<{ stream: string; hash?: string }> = async function (_, { stream, hash }) {
  // const permission = socket.auth.access.get(stream).can("get", "events");
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to get events on this stream");
  // }
  const filter: any = { "data.id": stream };
  if (hash) {
    filter["hash.commit"] = {
      $gt: hash
    };
  }
  return this.respond(await collection.events.find(filter).sort({ "meta.timestamp": 1 }).toArray());
};

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

wss.register([Route.on("events.add", [hasData(["id", "streams", "event"]), add]), Route.on("events.get", [hasData(["stream"]), get])]);
