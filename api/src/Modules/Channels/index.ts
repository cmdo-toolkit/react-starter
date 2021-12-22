import { Route } from "cmdo-socket";

import { hasData } from "../../Policies/hasData";
import { wss } from "../../Providers/WebSocketServer";
import { join, leave, message } from "./Channels.Controller";

wss.register([
  Route.on("channels.join", [hasData(["channelId"]), join]),
  Route.on("channels.message", [hasData(["channelId", "message"]), message]),
  Route.on("channels.leave", [hasData(["channelId"]), leave])
]);
