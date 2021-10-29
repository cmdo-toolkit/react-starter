import { Route } from "cmdo-http";
import { Action, Route as SocketRoute } from "cmdo-socket";

import { router } from "../Providers/Router";
import { wss } from "../Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Routes
 |--------------------------------------------------------------------------------
 */

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

/*
 |--------------------------------------------------------------------------------
 | Action
 |--------------------------------------------------------------------------------
 */

const ping: Action = async function () {
  return this.respond({ pong: true });
};

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

wss.register([SocketRoute.on("ping", [ping])]);
