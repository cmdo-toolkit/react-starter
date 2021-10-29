import { Route } from "cmdo-socket";

import { createToken } from "../Lib/Account/Actions/CreateToken";
import { validateToken } from "../Lib/Account/Actions/ValidateToken";
import { hasData } from "../Policies/hasData";
import { wss } from "../Providers/WebSocketServer";

/*
 |--------------------------------------------------------------------------------
 | Register
 |--------------------------------------------------------------------------------
 */

wss.register([
  Route.on("account.token", [hasData(["email"]), createToken]),
  Route.on("account.validate", [hasData(["email", "token"]), validateToken])
]);
