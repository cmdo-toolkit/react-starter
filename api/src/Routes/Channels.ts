import { Action, Route } from "cmdo-socket";

import { hasData } from "../Policies/hasData";
import { wss } from "../Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Actions
 |--------------------------------------------------------------------------------
 */

//#region

const join: Action<{ channelId: string }> = async function (socket, { channelId }) {
  if (channelId !== "public") {
    const permission = socket.auth.access.get(channelId).can("join", "room");
    if (!permission.granted) {
      return this.reject("You are not authorized to join this channel");
    }
  }
  socket.join(`channel:${channelId}`);
  return this.respond();
};

const leave: Action<{ channelId: string }> = async function (socket, { channelId }) {
  socket.leave(`channel:${channelId}`);
  return this.respond();
};

const message: Action<{ channelId: string; message: string }> = async function (socket, { channelId, message }) {
  socket.to(`channel:${channelId}`).emit("chat", { message });
  return this.respond();
};

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

//#region

wss.register([
  Route.on("channels.join", [hasData(["channelId"]), join]),
  Route.on("channels.leave", [hasData(["channelId"]), leave]),
  Route.on("channels.message", [hasData(["channelId", "message"]), message])
]);

//#endregion
