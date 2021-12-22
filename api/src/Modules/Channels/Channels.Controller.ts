import { Action } from "cmdo-socket";

/*
 |--------------------------------------------------------------------------------
 | Join
 |--------------------------------------------------------------------------------
 */

export const join: Action<{ channelId: string }> = async function (socket, { channelId }) {
  // if (channelId !== "public") {
  //   const permission = access.can("join", "room");
  //   if (!permission.granted) {
  //     return this.reject("You are not authorized to join this channel");
  //   }
  // }
  socket.join(`channel:${channelId}`);
  return this.respond();
};

/*
 |--------------------------------------------------------------------------------
 | Message
 |--------------------------------------------------------------------------------
 */

export const message: Action<{ channelId: string; message: string }> = async function (socket, { channelId, message }) {
  socket.to(`channel:${channelId}`).emit("chat", { message });
  return this.respond();
};

/*
 |--------------------------------------------------------------------------------
 | Leave
 |--------------------------------------------------------------------------------
 */

export const leave: Action<{ channelId: string }> = async function (socket, { channelId }) {
  socket.leave(`channel:${channelId}`);
  return this.respond();
};
