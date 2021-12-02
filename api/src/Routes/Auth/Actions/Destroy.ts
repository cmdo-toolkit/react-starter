import { Auth } from "cmdo-auth";
import { Action } from "cmdo-socket";

export const destroy: Action = async function (socket) {
  socket.auth = await Auth.guest();
  return this.respond();
};
