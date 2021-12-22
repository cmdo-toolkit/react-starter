import { Route as HttpRoute } from "cmdo-http";
import { Route as WsRoute } from "cmdo-socket";

import { router } from "../../Providers/Router";
import { wss } from "../../Providers/WebSocketServer";
import { meta, ping } from "./Api.Controller";

router.register([HttpRoute.get("", [meta])]);

wss.register([WsRoute.on("ping", [ping])]);
