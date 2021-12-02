import { Route } from "cmdo-socket";

import { hasData } from "../../Policies/hasData";
import { wss } from "../../Providers/WebSocketServer";
import { createToken } from "./Actions/CreateToken";
import { validateToken } from "./Actions/ValidateToken";

wss.register([
  Route.on("account.token", [hasData(["email"]), createToken]),
  Route.on("account.validate", [hasData(["email", "token"]), validateToken])
]);
