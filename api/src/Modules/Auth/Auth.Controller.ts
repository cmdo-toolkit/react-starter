import { Auth, container } from "cmdo-auth";
import type { Action } from "cmdo-socket";

/*
 |--------------------------------------------------------------------------------
 | Sign
 |--------------------------------------------------------------------------------
 */

export const sign: Action<{ token: string }> = async function (socket, { token }) {
  try {
    socket.auth = await Auth.resolve(token);
  } catch (err) {
    return this.reject(err.message);
  }
  return this.respond();
};

/*
 |--------------------------------------------------------------------------------
 | Permissions
 |--------------------------------------------------------------------------------
 */

export const getPermissions: Action = async function (socket, { tenantId }) {
  return this.respond(await container.get("Database").getPermissions(tenantId, socket.auth.auditor));
};

/*
 |--------------------------------------------------------------------------------
 | Destroy
 |--------------------------------------------------------------------------------
 */

export const destroy: Action = async function (socket) {
  socket.auth = await Auth.guest();
  return this.respond();
};
