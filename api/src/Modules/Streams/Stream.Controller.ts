import { container, EventRecord } from "cmdo-events";
import type { Action } from "cmdo-socket";

import { collection } from "../../Collections";

/*
 |--------------------------------------------------------------------------------
 | Push
 |--------------------------------------------------------------------------------
 */

export const push: Action<{ events: EventRecord[] }> = async function (socket, { events }, store = container.get("EventStore")) {
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

/*
 |--------------------------------------------------------------------------------
 | Pull
 |--------------------------------------------------------------------------------
 */

export const pull: Action<{ streamId: string; hash?: string }> = async function (_, { streamId, hash }) {
  // const permission = socket.auth.access.get(stream).can("get", "events");
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to get events on this stream");
  // }
  const filter: any = { streamId };
  if (hash) {
    filter["commit"] = {
      $gt: hash
    };
  }
  return this.respond(await collection.events.find(filter).sort({ date: 1 }).toArray());
};

/*
 |--------------------------------------------------------------------------------
 | Join
 |--------------------------------------------------------------------------------
 */

export const join: Action<{ streamId: string }> = async function (socket, { streamId }) {
  // const permission = socket.auth.access.get(streamId).can("join", "stream");
  // if (!permission.granted) {
  //   return this.reject("You are not authorized to join this stream");
  // }
  socket.join(`stream:${streamId}`);
  return this.respond();
};

/*
 |--------------------------------------------------------------------------------
 | Leave
 |--------------------------------------------------------------------------------
 */

export const leave: Action<{ streamId: string }> = async function (socket, { streamId }) {
  socket.leave(`stream:${streamId}`);
  return this.respond();
};
