import { Action } from "cmdo-socket";

export const getGrants: Action = async function (socket) {
  if (!socket.auth) {
    return this.reject("Auth Grant Violation: Unauthenticated");
  }
  return this.respond(socket.auth.access.data);
};
