import { Route } from "cmdo-socket";

import { hasData } from "../../Policies/hasData";
import { isSocketAuthenticated } from "../../Policies/isAuthenticated";
import { wss } from "../../Providers/WebSocketServer";
import { destroy } from "./Actions/Destroy";
import { getGrants } from "./Actions/GetGrants";
import { sign } from "./Actions/Sign";

wss.register([
  Route.on("auth.sign", [hasData(["token"]), sign]),
  Route.on("auth.destroy", [destroy]),
  Route.on("auth.getGrants", [isSocketAuthenticated, getGrants])
]);
