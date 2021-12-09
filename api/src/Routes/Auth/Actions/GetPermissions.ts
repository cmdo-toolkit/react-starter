import { container } from "cmdo-auth";
import { Action } from "cmdo-socket";

export const getPermissions: Action = async function (socket, { tenantId }) {
  return this.respond(await container.get("Database").getPermissions(tenantId, socket.auth.auditor));
};
