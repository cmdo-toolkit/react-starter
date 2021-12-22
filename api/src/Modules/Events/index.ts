import { Route } from "cmdo-socket";

import { hasData } from "../../Policies/hasData";
import { wss } from "../../Providers/WebSocketServer";
import { add, get, rehydrate } from "./Events.Controller";

wss.register([
  Route.on("events.add", [hasData(["id", "streams", "event"]), add]),
  Route.on("events.get", [hasData(["stream"]), get]),
  Route.on("events.rehydrate", [rehydrate])
]);
