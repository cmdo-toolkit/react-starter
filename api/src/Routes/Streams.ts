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

const push: Action<{ events: EventRecord[] }> = async function (socket, { events }, store = container.get("EventStore")) {
  // const permission = socket.auth.access.get(descriptor.stream).can("add", descriptor.event.type);
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to add this event to the stream");
  // }
  for (const event of events) {
    try {
      await store.insert(event);
      socket.to(`stream:${event.streamId}`).emit("event", event);
    } catch (error) {
      return this.reject(error.message);
    }
  }
  return this.respond();
};

const pull: Action<{ id: string; hash?: string }> = async function (_, { id, hash }) {
  // const permission = socket.auth.access.get(stream).can("get", "events");
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to get events on this stream");
  // }
  const filter: any = { "data.id": id };
  if (hash) {
    filter["hash.commit"] = {
      $gt: hash
    };
  }
  return this.respond(await collection.events.find(filter).sort({ "meta.timestamp": 1 }).toArray());
};

const join: Action<{ id: string }> = async function (socket, { id }) {
  // const permission = socket.auth.access.get(stream).can("join", "stream");
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to join this stream");
  // }
  socket.join(`stream:${id}`);
  return this.respond();
};

const leave: Action<{ id: string }> = async function (socket, { id }) {
  socket.leave(`stream:${id}`);
  return this.respond();
};

/*
 |--------------------------------------------------------------------------------
 | Store
 |--------------------------------------------------------------------------------
 */

// store.on("saved", (descriptor) => {
//   for (const stream of descriptor.streams) {
//     wss.to(`stream:${stream}`).emit("event", descriptor);
//   }
// });

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

wss.register([
  Route.on("streams.push", [hasData(["events"]), push]),
  Route.on("streams.pull", [hasData(["id"]), pull]),
  Route.on("streams.join", [hasData(["id"]), join]),
  Route.on("streams.leave", [hasData(["id"]), leave])
]);
