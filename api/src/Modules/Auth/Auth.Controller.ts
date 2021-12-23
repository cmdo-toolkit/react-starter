import { Auth, container } from "cmdo-auth";
import type { WsAction } from "cmdo-server";

/*
 |--------------------------------------------------------------------------------
 | Sign
 |--------------------------------------------------------------------------------
 */

export const sign: WsAction<{ token: string }> = async function (socket, { token }) {
  try {
    socket.auth = await Auth.resolve(token);
  } catch (err) {
    return this.reject(400, err.message);
  }
  return this.resolve();
};

/*
 |--------------------------------------------------------------------------------
 | Permissions
 |--------------------------------------------------------------------------------
 */

export const getPermissions: WsAction = async function (socket, { tenantId }) {
  return this.resolve(await container.get("Database").getPermissions(tenantId, socket.auth.auditor));
};

/*
 |--------------------------------------------------------------------------------
 | Destroy
 |--------------------------------------------------------------------------------
 */

export const destroy: WsAction = async function (socket) {
  socket.auth = await Auth.guest();
  return this.resolve();
};
