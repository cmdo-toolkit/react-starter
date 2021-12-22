import { Route } from "cmdo-socket";

import { hasData } from "../../Policies/hasData";
import { wss } from "../../Providers/WebSocketServer";
import { create, validate } from "./Token.Controller";

wss.register([
  Route.on("account.token", [hasData(["email"]), create]),
  Route.on("account.validate", [hasData(["email", "token"]), validate])
]);
