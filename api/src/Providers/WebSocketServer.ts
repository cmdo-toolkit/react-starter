import { Server } from "cmdo-socket";

import { auth } from "../Middleware/Auth";

/*
 |--------------------------------------------------------------------------------
 | Server
 |--------------------------------------------------------------------------------
 */

//#region

export const wss = new Server({}, [auth.socket]);

//#endregion
