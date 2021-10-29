import { Server } from "cmdo-socket";

import { auth } from "../Middleware/Auth";

/*
 |--------------------------------------------------------------------------------
 | Server
 |--------------------------------------------------------------------------------
 */

export const wss = new Server({}, [auth.socket]);
