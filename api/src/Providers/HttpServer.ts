import { cors, route, server } from "cmdo-http";

import { auth } from "../Middleware/Auth";
import { router } from "./Router";

/*
 |--------------------------------------------------------------------------------
 | HTTP Server
 |--------------------------------------------------------------------------------
 */

export const hts = server([cors(), auth.http, route(router)]);
