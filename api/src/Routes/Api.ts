import { Route } from "cmdo-http";
import { Action, Route as SocketRoute } from "cmdo-socket";

import { router } from "../Providers/Router";
import { wss } from "../Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Routes
 |--------------------------------------------------------------------------------
 */

//#region

router.register([
  Route.get("", [
    async function () {
      return this.respond({
        service: "production",
        version: "0.0.1-DEV"
      });
    }
  ])
]);

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Action
 |--------------------------------------------------------------------------------
 */

//#region

const ping: Action = async function () {
  return this.respond({ pong: true });
};

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

//#region

wss.register([SocketRoute.on("ping", [ping])]);

//#endregion
