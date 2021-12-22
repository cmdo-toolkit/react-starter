import { Route } from "cmdo-socket";

import { hasData } from "../../Policies/hasData";
import { isSocketAuthenticated } from "../../Policies/isAuthenticated";
import { wss } from "../../Providers/WebSocketServer";
import { destroy, getPermissions, sign } from "./Auth.Controller";

wss.register([
  Route.on("auth.sign", [hasData(["token"]), sign]),
  Route.on("auth.getPermissions", [isSocketAuthenticated, hasData(["tenantId"]), getPermissions]),
  Route.on("auth.destroy", [destroy])
]);
