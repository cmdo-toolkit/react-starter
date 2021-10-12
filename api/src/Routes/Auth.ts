import { Auth } from "cmdo-auth";
import { Action, Route as SocketRoute } from "cmdo-socket";

import { hasData } from "../Policies/hasData";
import { wss } from "../Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Action
 |--------------------------------------------------------------------------------
 */

//#region

const token: Action<{ token: string }> = async function (socket, data) {
  try {
    socket.auth = await Auth.resolve(data.token);
  } catch (err) {
    return this.reject(err.message);
  }
  return this.respond();
};

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

//#region

wss.register([SocketRoute.on("auth.token", [hasData(["token"]), token])]);

//#endregion
