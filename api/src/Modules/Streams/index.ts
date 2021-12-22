import { Route } from "cmdo-socket";

import { hasData } from "../../Policies/hasData";
import { wss } from "../../Providers/WebSocketServer";
import { join, leave, pull, push } from "./Stream.Controller";

// store.on("saved", (descriptor) => {
//   for (const stream of descriptor.streams) {
//     wss.to(`stream:${stream}`).emit("event", descriptor);
//   }
// });

wss.register([
  Route.on("streams.push", [hasData(["events"]), push]),
  Route.on("streams.pull", [hasData(["streamId"]), pull]),
  Route.on("streams.join", [hasData(["streamId"]), join]),
  Route.on("streams.leave", [hasData(["streamId"]), leave])
]);
