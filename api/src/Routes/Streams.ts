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

const push: Action<{ descriptors: EventDescriptor[] }> = async function (socket, { descriptors }) {
  // const permission = socket.auth.access.get(descriptor.stream).can("add", descriptor.event.type);
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to add this event to the stream");
  // }
  console.log(descriptors);
  for (const descriptor of descriptors) {
    const inserted = await Stream.append(descriptor);
    if (inserted) {
      socket.to(`stream:${descriptor.stream}`).emit("event", inserted);
    }
  }
  return this.respond();
};

const pull: Action<{ stream: string; hash?: string }> = async function (_, { stream, hash }) {
  // const permission = socket.auth.access.get(stream).can("get", "events");
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to get events on this stream");
  // }
  const filter: any = { streams: stream };
  if (hash) {
    filter.hash = {
      $gt: hash
    };
  }
  return this.respond(await collection.events.find(filter).sort({ "event.meta.created": 1 }).toArray());
};

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
  Route.on("streams.push", [hasData(["descriptors"]), push]),
  Route.on("streams.pull", [hasData(["stream"]), pull]),
  Route.on("streams.join", [hasData(["stream"]), join]),
  Route.on("streams.leave", [hasData(["stream"]), leave])
]);
